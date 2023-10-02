

from riotwatcher import LolWatcher,ApiError



key = 'RGAPI-5bf56ecc-1f78-4ab8-9230-8dd2d7f0f386' #utdatert

watcher = LolWatcher(key)
server = 'EUW1'
summonerName = 'BlueMista'


summoner = watcher.summoner.by_name(server,summonerName)


id = (summoner['id'])
puuid = summoner['puuid']
accountId = summoner['accountId']

matchlist  = watcher.match.matchlist_by_puuid(server,puuid)

rank = watcher.league.by_summoner(server,id)
champs = watcher.champion.rotations(server)

if len(rank) == 0:
    print(summonerName + ' has not played ranked or finished promos this season. Good job overcoming the league addiction')

else:
    wins = int(rank[0]['wins'])
    losses = int(rank[0]['losses'])
    games = wins + losses


    wr = round(wins/games *100,1)



  
    
    
print(summonerName + ' has ' + str(wins) + ' wins and ' + str(losses) + ' losses this season. Giving a winrate of ' + str(wr) + "%. Their rank right now is " + rank[0]['tier'] + " " + rank[0]['rank'] +" - " + str(rank[0]['leaguePoints']) + "LP")
matches = watcher.match.matchlist_by_puuid(server,puuid)

lastMatch = matches[0] 
  
print(lastMatch)

#detail = watcher.match.by_id(server,lastMatch)
#print(summoner)
#print(detail)
#log = []
#for row in detail['participants']:
 #   print(row)
 #   log['win'] = row['stats']['win']

#print(log)

#IKTp7tRqZAEhFCoYdecdm5GfcyMBvymVTEGPXIgVxmceEYZDtwP6odBjELgTrAM0nVFPnJne6CGOgQ