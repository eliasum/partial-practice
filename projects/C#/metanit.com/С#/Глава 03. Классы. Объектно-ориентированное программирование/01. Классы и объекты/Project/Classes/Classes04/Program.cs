﻿/*2020.07.18 00:13 IMM*/

using System;

namespace Classes04
{
	
//Ключевое слово this

//Ключевое слово this представляет ссылку на текущий экземпляр класса. В каких 
//ситуациях оно нам может пригодиться? В примере выше определены три конструктора.
//Все три конструктора выполняют однотипные действия - устанавливают значения
//полей name и age. Но этих повторяющихся действий могло быть больше. И мы можем 
//не дублировать функциональность конструкторов, а просто обращаться из одного 
//конструктора к другому через ключевое слово this, передавая нужные значения
//для параметров:

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
    		Person bob = new Person("Bob");     //вызов 2-ого конструктора с одним параметром
    		Person sam = new Person("Sam", 25); // вызов 3-его конструктора с двумя параметрами


    		bob.GetInfo();          // Имя: Bob  Возраст: 18
    		tom.GetInfo();          // Имя: Неизвестно  Возраст: 18
    		sam.GetInfo();          // Имя: Sam  Возраст: 25
    
    		Console.ReadKey();
        }
    }
}



//class Person
//{
//    public string name;
//    public int age;

//    public Person() : this("Неизвестно")
//    {
//    }
//    public Person(string name) : this(name, 18)
//    {
//    }
//    public Person(string name, int age)
//    {
//        this.name = name;
//        this.age = age;
//    }
//    public void GetInfo()
//    {
//        Console.WriteLine($"Имя: {name}  Возраст: {age}");
//    }
//}

//В данном случае первый конструктор вызывает второй, а второй конструктор вызывает
//третий. По количеству и типу параметров компилятор узнает, какой именно 
//конструктор вызывается. Например, во втором конструкторе:

//public Person(string name) : this(name, 18)
//{
//}

//идет обращение к третьему конструктору, которому передаются два значения.
//Причем в начале будет выполняться именно третий конструктор, и только 
//потом код второго конструктора.

//Также стоит отметить, что в третьем конструкторе параметры называются 
//также, как и поля класса.

//public Person(string name, int age)
//{
//    this.name = name;
//    this.age = age;
//}

//И чтобы разграничить параметры и поля класса, к полям класса обращение 
//идет через ключевое слово this. Так, в выражении this.name = name; первая
//часть this.name означает, что name - это поле текущего класса, а не 
//название параметра name.Если бы у нас параметры и поля назывались
//по-разному, то использовать слово this было бы необязательно.Также через
//ключевое слово this можно обращаться к любому полю или методу.

//Инициализаторы объектов

//Для инициализации объектов классов можно применять инициализаторы. 
//Инициализаторы представляют передачу в фигурных скобках значений 
//доступным полям и свойствам объекта:

//Person tom = new Person { name = "Tom", age = 31 };
//tom.GetInfo();          // Имя: Tom  Возраст: 31

//С помощью инициализатора объектов можно присваивать значения всем доступным
//полям и свойствам объекта в момент создания без явного вызова конструктора.

//При использовании инициализаторов следует учитывать следующие моменты:

//    С помощью инициализатора мы можем установить значения только доступных
//из внешнего кода полей и свойств объекта. Например, в примере выше поля
//name и age имеют модификатор доступа public, поэтому они доступны из любой
//части программы.

//    Инициализатор выполняется после конструктора, поэтому если и в конструкторе,
//и в инициализаторе устанавливаются значения одних и тех же полей и свойств, то 
//значения, устанавливаемые в конструкторе, заменяются значениями из инициализатора.
