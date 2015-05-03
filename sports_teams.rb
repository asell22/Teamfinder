require "rubygems"
require "nokogiri"
require "open-uri"

baseball_url = "http://m.espn.go.com/mlb/teams?wjb"

baseball_page = Nokogiri::HTML(open(baseball_url))

baseball_teams = baseball_page.css("div.ind a")

File.open('lib/baseball_teams.txt', 'w+') do |file|

  baseball_teams[0..29].each do |team|
    file.write("#{team.text}\n")
  end
end


football_url = "http://m.espn.go.com/nfl/teams?wjb"

football_page = Nokogiri::HTML(open(football_url))

football_teams = football_page.css("div.ind a")

File.open('lib/football_teams.txt', 'w+') do |file|
  football_teams[0..31].each do |team|
    file.write("#{team.text}\n")
  end
end


basketball_url = "http://m.espn.go.com/nba/teams?wjb"

basketball_page = Nokogiri::HTML(open(basketball_url))

basketball_teams = basketball_page.css("div.ind a")

File.open('lib/basketball_teams.txt', 'w+') do |file|
  basketball_teams[0..29].each do |team|
    file.write("#{team.text}\n")
  end
end

hockey_url = "http://m.espn.go.com/nhl/teams?wjb"

hockey_page = Nokogiri::HTML(open(hockey_url))

hockey_teams = hockey_page.css("div.ind a")

File.open('lib/hockey_teams.txt', 'w+') do |file|
  hockey_teams[0..29].each do |team|
    file.write("#{team.text}\n")
  end
end
