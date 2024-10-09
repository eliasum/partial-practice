using System;

class MyClass
{
    public string change;
}

struct MyStruct
{
    public string change;
}

class Program
{
    static void ClassTaker(MyClass c)
    {
        c.change = "изменено";
    }

    static void StructTaker(MyStruct s)
    {
        s.change = "изменено";
    }

    static void Main()
    {
        MyClass testClass = new MyClass();
        MyStruct testStruct = new MyStruct();

        testClass.change = "не изменено";
        testStruct.change = "не изменено";

        ClassTaker(testClass);
        StructTaker(testStruct);

        Console.WriteLine("Поле классса = {0}", testClass.change);
        Console.WriteLine("Поле структуры = {0}", testStruct.change);

        Console.ReadKey();
    }
}