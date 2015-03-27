class WelcomeController < ApplicationController
  include Yelp::V2::Search::Request

  def index
  end

  def search

    client = Yelp::Client.new
    request = Location.new(
     city: params[:city],
     term: params[:team],
     category_filter: "bars",
     )

    response = client.search(request)



    render json: response

  end

end
