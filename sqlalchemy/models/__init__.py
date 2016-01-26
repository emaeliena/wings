from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


BaseModel = declarative_base()


maneuver_cards_planes = Table('maneuver_cards_planes', BaseModel.metadata,
	Column('card_id', Integer, ForeignKey('maneuver_cards.id'), primary_key=True),
	Column('plane_id', Integer, ForeignKey('planes.id'), primary_key=True)
)


class ManeuverCard(BaseModel):
	__tablename__ = 'maneuver_cards'

	id = Column(Integer, primary_key=True)
	name = Column(String(20))
	planes = relationship('Plane', secondary=maneuver_cards_planes, back_populates='maneuver_cards')


class Plane(BaseModel):
	__tablename__ = 'planes'

	id = Column(Integer, primary_key=True)
	name = Column(String(100))
	maneuver_cards = relationship('ManeuverCard', secondary=maneuver_cards_planes, back_populates='planes')