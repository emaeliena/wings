import uuid

import redis


HOST = '172.17.0.2'
PORT = 6379

GAME_KEY = 'game'
PLANES_KEY = 'planes'


r = redis.StrictRedis(host=HOST, port=PORT, db=0)


class KeyGenerator(object):

	def __init__(self, game_key_prefix, planes_key_prefix):
		self.uuid = uuid.uuid1()
		self.game_key_prefix = game_key_prefix
		self.planes_key_prefix = planes_key_prefix

	@property
	def game_key(self):
		return '{}:{}'.format(self.game_key_prefix, self.uuid)

	@property
	def planes_key(self):
		return '{}:{}'.format(self.planes_key_prefix, self.uuid)


def create_game():
	key = KeyGenerator(GAME_KEY, PLANES_KEY)
	print key.uuid
	game = {
		'turn': 1,
		'phase': 0,
	}
	r.hmset(key.game_key, game)
	for name in ['malna', 'jankes', 'gala']:
		create_plane(key, name)	


def create_plane(keygen, playername):
	idx = uuid.uuid1()
	plane = {
		'name': 'Sopwith Camel',
		'health': 15,
		'deck': 'C',
		'damage': 'A',
		'player': playername
	}
	r.hmset('plane:{}'.format(idx), plane)
	r.sadd('planes:{}'.format(keygenz.uuid), idx)


if __name__ == '__main__':
	create_game()