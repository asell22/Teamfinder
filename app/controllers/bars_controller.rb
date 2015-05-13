class BarsController < ApplicationController
  include Yelp::V2::Search::Request
  before_action :require_signin!, except: [:index, :search]
  before_action :authorize_admin!, except: [:index, :search, :new, :create]

  def index
    serialized_results = []
    bars = Bar.where(city:params[:city])
    teams = Team.where(name: params[:team])

    teams.each do |team|
      bars.each do |bar|
        if bar.id == team.bar_id
          serialized_results.push({
            name: bar.name,
            address: bar.address,
            city: bar.city,
            latitude: bar.latitude,
            longitude: bar.longitude,
            phone: bar.phone,
            url: bar.url,
            teams: team
          })
        end
      end
    end

    render json: serialized_results
  end

  def list
    @bars = Bar.all
  end

  def new

  end


  def search

   client = Yelp::Client.new
    request = Location.new(
      term: params[:name],
      city: params[:city],
      category_filter: "bars",
    )
    response = client.search(request)
    render json: response
  end

  def create
    bar = Bar.new(bar_params)

    if bar.save
      puts "good"
      params[:teams].each do |team_name|
        bar.teams.create({name: team_name})
      end
      render :js => "window.location = '/'"
      flash[:notice] = "Your bar has been suggested!"



    else
      puts "bad"
      render json: bar.errors, status: 500
    end
  end

  def destroy
    @bar = Bar.find(params[:id])
    @bar.destroy
    redirect_to bars_list_path, notice: "Bar has been deleted"
  end

  def show
    @bar = Bar.find(params[:id])
  end

    # response = client.search(request)
    # puts "#"*100
    # p response
    # p response["businesses"]
    # # p location.geography["longitude"]
    # businesses = response["businesses"]
    #
    # @bar = Bar.new({
    #   city: businesses[:location][:city],
    #   name: businesses[:name],
    #   address: businesses[:location][:display_address],
    #   latitude: businesses[:location][:coordinate][:latitude],
    #   longitude: businesses[:location][:coordinate][:longitude],
    #   url: businesses[:url],
    #   phone: businesses[:display_phone]
    # })
    # p @bar
    #
    # @bar.save
    # redirect_to root_path


  private

  def authorize_admin!
    require_signin!

    unless current_user.admin?
      flash[:notice] = "You must be an admin to do that."
      redirect_to root_path
    end
  end

  def bar_params
    params.require(:bar).permit(:city, :name, :address, :latitude, :longitude, :url, :phone)
  end

end
