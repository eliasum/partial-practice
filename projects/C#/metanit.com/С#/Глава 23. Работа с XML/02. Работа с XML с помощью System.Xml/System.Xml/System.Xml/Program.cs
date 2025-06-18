﻿/*2021.08.09 13:12 IMM*/

using System;
using System.Xml;

/*
Работа с XML с помощью классов System.Xml

Для работы с XML в C# можно использовать несколько подходов. В первых версиях 
фреймворка основной функционал работы с XML предоставляло пространство имен 
System.Xml. В нем определен ряд классов, которые позволяют манипулировать 
xml-документом:

    - XmlNode: представляет узел xml. В качестве узла может использоваться весь 
    документ, так и отдельный элемент

    - XmlDocument: представляет весь xml-документ

    - XmlElement: представляет отдельный элемент. Наследуется от класса XmlNode

    - XmlAttribute: представляет атрибут элемента

    - XmlText: представляет значение элемента в виде текста, то есть тот текст, 
    который находится в элементе между его открывающим и закрывающим тегами

    - XmlComment: представляет комментарий в xml

    - XmlNodeList: используется для работы со списком узлов

Ключевым классом, который позволяет манипулировать содержимым xml, является 
XmlNode, поэтому рассмотрим некоторые его основные методы и свойства:

    - Свойство Attributes возвращает объект XmlAttributeCollection, который 
    представляет коллекцию атрибутов

    - Свойство ChildNodes возвращает коллекцию дочерних узлов для данного узла

    - Свойство HasChildNodes возвращает true, если текущий узел имеет дочерние узлы

    - Свойство FirstChild возвращает первый дочерний узел

    - Свойство LastChild возвращает последний дочерний узел

    - Свойство InnerText возвращает текстовое значение узла

    - Свойство InnerXml возвращает всю внутреннюю разметку xml узла

    - Свойство Name возвращает название узла. Например, <user> - 
    значение свойства Name равно "user"

    - Свойство ParentNode возвращает родительский узел у текущего узла

Применим эти классы и их функционал. И вначале для работы с xml создадим 
новый файл. Назовем его users.xml и определим в нем следующее содержание:
	
<?xml version="1.0" encoding="utf-8" ?>
<users>
  <user name="Bill Gates">
    <company>Microsoft</company>
    <age>48</age>
  </user>
  <user name="Larry Page">
    <company>Google</company>
    <age>42</age>
  </user>
</users>

Теперь пройдемся по этому документу и выведем его данные на консоль:
*/

namespace System_Xml
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
            Чтобы начать работу с документом xml, нам надо создать объект 
            XmlDocument и затем загрузить в него xml-файл: 
            */
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load(@"users.xml");

            /*
            При разборе xml для начала мы получаем корневой элемент документа с
            помощью свойства xDoc.DocumentElement. Далее уже происходит собственно
            разбор узлов документа.
            */
            // получим корневой элемент
            XmlElement xRoot = xDoc.DocumentElement;

            /*
            В цикле foreach(XmlNode xnode in xRoot) пробегаемся по всем дочерним
            узлам корневого элемента. 
            */
            // обход всех узлов в корневом элементе
            foreach (XmlNode xnode in xRoot)
            {
                // если атрибуты есть (тег user c атрибутом name)
                if (xnode.Attributes.Count > 0)     
                {
                    /*
                    Так как дочерние узлы представляют элементы
                    <user>, то мы можем получить их атрибуты:
                    */
                    // получаем атрибут name со значением value
                    XmlNode attr = xnode.Attributes.GetNamedItem("name");
                    if (attr != null)
                        Console.WriteLine(attr.Value);
                }

                // обходим все дочерние узлы элемента user
                foreach (XmlNode childnode in xnode.ChildNodes)
                {
                    /*
                    Чтобы определить, что за узел перед нами, мы можем
                    сравнить его название
                    */
                    // если узел - company
                    if (childnode.Name == "company")
                    {
                        Console.WriteLine($"Компания: {childnode.InnerText}");
                    }
                    // если узел age
                    if (childnode.Name == "age")
                    {
                        Console.WriteLine($"Возраст: {childnode.InnerText}");
                    }
                }
                Console.WriteLine();
            }
            Console.Read();
        }
    }
}
