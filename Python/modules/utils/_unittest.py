import unittest

class Vector:

    def __init__(self,x,y):
        self.x = x
        self.y =y
        
    def add(self,new_x,new_y):
        self.x += + new_x
        self.y += +new_y
    

class TestVector(unittest.TestCase):
    def test_init(self):
        v = Vector(1,2)
        self.assertEqual(v.x,1)
        
        