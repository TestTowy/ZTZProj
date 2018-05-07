-- Srednia liczba wyswietlen kążdego miesiąca wraz z liczbą wyświetlen na przestrzeni trzech lat uporządkowana malejąco 
--Możemy łatwo zauwarzyć ze w Styczniu lutym i marcu w ostatnich trzech latach wydano najwięcje filmuów co wpłyneło na najwyzsza ogladalnosc w tych miesiacach
-- redis-cli -h redis-19136.c8.us-east-1-3.ec2.cloud.redislabs.com -p 19136 -a test123 --eval test.lua

local sum2015 = 0
local rejestr2015 = redis.call('ZUNIONSTORE','test',3,'wyswietlenia_2015','wyswietlenia_2016','wyswietlenia_2017')
local rejestr2016 = redis.call('ZRANGE','wyswietlenia_2016',0,-1,'WITHSCORES')
local rejestr2017 = redis.call('ZREVRANGE','test',0,-1,'WITHSCORES')


for i=2, #rejestr2017, 2 do
    rejestr2017[i] = rejestr2017[i] / 3
end

return rejestr2017