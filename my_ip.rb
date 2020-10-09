require 'net/http'
my_ip = Net::HTTP.get('ipecho.net', '/plain')
puts "my_ip: #{my_ip.inspect}"