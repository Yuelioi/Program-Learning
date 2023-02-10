class Example:
    x = [1, 2, 3]

    @staticmethod
    def static_method():
        print("Static method called.")

    @classmethod
    def class_method(cls):
        print("Class method called.")
        print(cls.x)
        
Example.static_method()  # 输出 "Static method called."
Example.class_method()  # 输出 "Class method called." 和 "[1, 2, 3]"