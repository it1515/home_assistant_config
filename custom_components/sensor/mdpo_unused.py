"""
Component na miru pro moje ucely protoze zadne API nemam.
"""
import logging
import requests
import dateutil.parser
import voluptuous as vol
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
from datetime import timedelta
from homeassistant.helpers.entity import Entity
import homeassistant.helpers.config_validation as cv
from homeassistant.components.sensor import PLATFORM_SCHEMA

__version__ = '0.0.1'

CONF_STOPS = 'stops'

ATTR_NEXT_DEPARTURE = 'next_departure'
ATTR_FIRST_DEPARTURE = 'first_departure'
ATTR_COMPONENT = 'component'
ATTR_FRIENDLY_NAME = 'friendly_name'
ATTR_COMPONENT_VERSION = 'component_version'

DOMAIN = 'mdpo'
SCAN_INTERVAL = timedelta(seconds=30)

ICON = 'mdi:bus'
COMPONENT_NAME = 'mdpo'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_STOPS, default=None): 
        vol.All(cv.ensure_list, [cv.string]),
})

BASE_URL = 'http://elp.mdpo.cz/ElpDepartures/Home/Departures?stop='+CONF_STOPS

_LOGGER = logging.getLogger(__name__)

def setup_platform(hass, config):
    stops = config.get(CONF_STOPS)
