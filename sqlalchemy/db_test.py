from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, joinedload


from models import BaseModel, Plane, ManeuverCard

engine = create_engine('sqlite:///test.db', echo=True)
Session = sessionmaker(bind=engine)
# BaseModel.metadata.create_all(engine)

session = Session()

# deck_c1_20 = ManeuverCard(name="C1/20")
# session.add(deck_c1_20)
# deck_c5_20 = ManeuverCard(name="C5/20")
# session.add(deck_c5_20)
# deck_c7_20 = ManeuverCard(name="C7/20")
# session.add(deck_c7_20)

# plane_fokker = Plane(name='Fokker')

# plane_fokker.maneuver_cards.extend([deck_c1_20, deck_c5_20, deck_c7_20])
# session.add(plane_fokker)
# session.commit()

plane = session.query(Plane).first()
print plane.maneuver_cards