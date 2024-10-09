/*2020.07.17 23:48 IMM*/

using System;

namespace Classes03
{
	
//Создание конструкторов

//Выше для инициализации объекта использовался конструктор по умолчанию. Однако мы
//сами можем определить свои конструкторы:

    class Person
    {
    	public string name;
    	public int age;

    	public Person() { name = "Неизвестно"; age = 18; }      // 1 конструктор

    	public Person(string n) { name = n; age = 18; }         // 2 конструктор

    	public Person(string n, int a) { name = n; age = a; }   // 3 конструктор

    	public void GetInfo()
    	{
            //Console.WriteLine($"Имя: {name}  Возраст: {age}");	// support since C# 6	
            Console.WriteLine("Имя: {0}  Возраст: {1}", name, age);	// run in SharpDevelop 5.1.0
    	}
    }

    class Program
    {
		//Теперь в классе определено три конструктора, каждый из которых принимает 
		//различное количество параметров и устанавливает значения полей класса.
		//Используем эти конструкторы:
		
        static void Main(string[] args)
        {
    		Person tom = new Person();          // вызов 1-ого конструктора без параметров
    		Person bob = new Person("Bob");     // вызов 2-ого конструктора с одним параметром
    		Person sam = new Person("Sam", 25); // вызов 3-его конструктора с двумя параметрами


    		bob.GetInfo();          // Имя: Bob  Возраст: 18
    		tom.GetInfo();          // Имя: Неизвестно  Возраст: 18
    		sam.GetInfo();          // Имя: Sam  Возраст: 25
    
    		Console.ReadKey();
        }
    }
}

//Консольный вывод данной программы:

//Имя: Неизвестно Возраст: 18
//Имя: Bob Возраст: 18
//Имя: Sam Возраст: 25

//При этом если в классе определены конструкторы, то при создании объекта 
//необходимо использовать один из этих конструкторов.
