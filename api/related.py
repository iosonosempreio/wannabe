# -*- coding: utf-8 -*-

import requests
import json
import pprint

pp = pprint.PrettyPrinter(indent=1)

# metallica >	spotify:artist:2ye2Wgw4gimLv2eAKyk1NB

#queem >		spotify:artist:1dfeR4HaWDbWqFHLkxsg1d

# area >		spotify:artist:6o2PxnpsrQ352kwYlEwjvR



IDS = ['2ye2Wgw4gimLv2eAKyk1NB','1dfeR4HaWDbWqFHLkxsg1d']

related = {}
related[IDS[0]] = []
related[IDS[1]] = []

level = 1

match = False;

thisLevel = [ { 'right': [] } ]

def getRelated(artistId,container):
	url = 'https://api.spotify.com/v1/artists/'+artistId+'/related-artists'
	response = requests.get(url)
	responseJson = json.loads(response.content,'utf-8')
	for artist in responseJson['artists']:
		container.append({'name':artist['name'],'id':artist['id'],'level':level,'related':[]})

def compareRelated(listLeft,listRight):
	for artistLeft in listLeft:
		for artistRight in listRight:
			# print artistRight
			if artistLeft['id'] == artistRight['id']:
				print artistLeft['name'], '===', artistRight['name']
				# if artistLeft['id'] != IDS[0]:
				# 	if artistLeft['id'] != IDS[1]:
				# 		print artistLeft['name'], '===', artistRight['name']
				match = True

def getRelatedNextLevel(artistList, listToCompare):
	thisList = artistList
	for i, artist in enumerate(thisList):
		#print artist['name']
		getRelated(artist['id'], thisList[i]['related'] )
		for rel in thisList[i]['related']:
			# pp.pprint(rel)
			item = rel
			del item['related']
			listToCompare.append(item)

def iterateTroughLevels():
	level+=1
	toCompare['left'] = []
	toCompare['right'] = []
	getRelatedNextLevel(related[IDS[0]], toCompare['left'])
	getRelatedNextLevel(related[IDS[1]], toCompare['right'])

	compareRelated(toCompare['left'], toCompare['right'])

	# match = True


getRelated( IDS[0], related[IDS[0]] )
getRelated( IDS[1], related[IDS[1]] )

compareRelated(related[IDS[0]],related[IDS[1]])

toCompare = {}

while match == False:
	iterateTroughLevels()


with open('data.json', 'w') as outfile:
    json.dump(related, outfile)

# pp.pprint(related)