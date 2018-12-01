import csv

DOMAIN = 'mdpo'

def setup(hass, config):   

    hass.states.set('mdpo.first_departure', '5 min')

    return True