class BarsController < ApplicationController
  include Yelp::V2::Search::Request

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
    @bar = Bar.new(bar_params)
    if @bar.save
      puts "good"
      render json: @bar
    else
      puts "bad"
      render json: @bar.errors, status: 500
    end
  end
    #
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
