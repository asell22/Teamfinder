# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

baseball_teams = File.readlines("lib/baseball_teams.txt")
football_teams = File.readlines("lib/football_teams.txt")
basketball_teams = File.readlines("lib/basketball_teams.txt")
hockey_teams = File.readlines("lib/hockey_teams.txt")

baseball_teams.each do |team|
  Team.create(name: team.gsub("\n",""))
  puts team
  sleep 0.5
end

football_teams.each do |team|
  Team.create(name: team.gsub("\n",""))
  puts team
  sleep 0.5
end

basketball_teams.each do |team|
  Team.create(name: team.gsub("\n",""))
  puts team
  sleep 0.5
end

hockey_teams.each do |team|
  Team.create(name: team.gsub("\n",""))
  puts team
  sleep 0.5
end
