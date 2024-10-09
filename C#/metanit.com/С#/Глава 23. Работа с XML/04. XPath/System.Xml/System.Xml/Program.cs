/*2022.03.17 14:58 IMM*/

using System;
using System.Xml;

/*
XPath

XPath представляет язык запросов в XML. Он позволяет выбирать элементы,
соответствующие определенному селектору.

Рассмотрим некоторые наиболее распространенные селекторы:

. - выбор текущего узла

.. - выбор родительского узла

* - выбор всех дочерних узлов текущего узла

user - выбор всех узлов с определенным именем, в данном случае с именем "user"

@name - выбор атрибута текущего узла, после знака @ указывается название 
атрибута (в данном случае "name")

@+ - выбор всех атрибутов текущего узла

element[3] - выбор определенного дочернего узла по индексу, в данном 
случае третьего узла

//user - выбор в документе всех узлов с именем "user"

user[@name='Bill Gates'] - выбор элементов с определенным значением атрибута.
В данном случае выбираются все элементы "user" с атрибутом name='Bill Gates'

user[company='Microsoft'] - выбор элементов с определенным значением вложенного
элемента. В данном случае выбираются все элементы "user", у которых дочерний 
элемент "company" имеет значение 'Microsoft'

//user/company - выбор в документе всех узлов с именем "company", которые
находятся в элементах "user"

Действие запросов XPath основано на применении двух методов класса XmlElement:

    - SelectSingleNode(): выбор единственного узла из выборки. Если выборка по
    запросу содержит несколько узлов, то выбирается первый

    - SelectNodes(): выборка по запросу коллекции узлов в виде объекта XmlNodeList

Для запросов возьмем xml-документ из прошлых тем:
	
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

Теперь выберем все узлы корневого элемента, то есть все элементы user:
*/

namespace System_Xml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load(@"people.xml");

            XmlElement xRoot = xDoc.DocumentElement;

            // выбор всех дочерних узлов
            XmlNodeList childnodes = xRoot.SelectNodes("*");

            foreach (XmlNode n in childnodes)
                Console.WriteLine(n.OuterXml);

            Console.WriteLine("\n");
            //-----------------------------------------------------------------

            // Выберем все узлы <person>:
            XmlNodeList personNodes = xRoot?.SelectNodes("person");

            //Выведем на консоль значения атрибутов name у элементов person:
            if (personNodes != null)
            {
                // перебор узлов "person"
                foreach (XmlNode node in personNodes)
                    Console.WriteLine(node.SelectSingleNode("@name")?.Value);   // Tom, Bob
            }

            Console.WriteLine("\n");
            //-----------------------------------------------------------------

            // Выберем узел, у которого атрибут name имеет значение "Tom":
            XmlNode childnode = xRoot.SelectSingleNode("person[@name='Tom']");

            if (childnode != null)
                Console.WriteLine(childnode.OuterXml);

            Console.WriteLine("\n");
            //-----------------------------------------------------------------

            // Выберем узел, у которого вложенный элемент "company" имеет значение "Microsoft":
            XmlNode tomNode = xRoot.SelectSingleNode("person[company='Microsoft']");

            if (tomNode != null)
                Console.WriteLine(tomNode.OuterXml);

            Console.WriteLine("\n");
            //-----------------------------------------------------------------

            /*
            Допустим, нам надо получить только компании. Для этого надо осуществить
            выборку вниз по иерархии элементов:
            */
            XmlNodeList companyNodes = xRoot.SelectNodes("//person/company");

            foreach (XmlNode n in companyNodes)
                Console.WriteLine(n.InnerText);

            Console.Read();
        }
    }
}
