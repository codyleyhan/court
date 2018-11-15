from court.database import db
from court.users.models import User
from court.users.views import ProfileAPI, UserAPI
import time
from datetime import date

class Match():
	def match():
		u1 = User(id='testuser1', email='testuser1@gmail.com', created_at=date.fromtimestamp(time.time()), updated_at=date.fromtimestamp(time.time()))
		#db.session.add(u1)
		#db.session.commit()
		email = ''
		for user in User.query.all():
			email = user.email
			print(user.email)
		print(User.query.all())
		return email