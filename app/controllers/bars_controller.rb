class BarsController < ApplicationController
  include Yelp::V2::Search::Request

  def index
    serialized_results = []
    bars = Bar.where(city:params[:city])

    bars.each do |bar|
      serialized_results.push({
        name: bar.name,
        address: bar.address,
        city: bar.city,
        latitude: bar.latitude,
        longitude: bar.longitude,
        phone: bar.phone,
        url: bar.url,
        teams: bar.teams
      })
    end

    render json: serialized_results
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

      render json: bar
      flash.notice = "Your bar has been added!"

    else
      puts "bad"
      render json: bar.errors, status: 500
    end
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

  def bar_params
    params.require(:bar).permit(:city, :name, :address, :latitude, :longitude, :url, :phone)
  end

end
