/*2021.08.09 14:53 IMM*/

using System;
using System.Xml;

/*
Изменение XML-документа

Для редактирования xml-документа (изменения, добавления, удаления элементов)
мы можем воспользоваться методами класса XmlNode:

    - AppendChild: добавляет в конец текущего узла новый дочерний узел

    - InsertAfter: добавляет новый узел после определенного узла

    - InsertBefore: добавляет новый узел до определенного узла

    - RemoveAll: удаляет все дочерние узлы текущего узла

    - RemoveChild: удаляет у текущего узла один дочерний узел и возвращает его

Класс XmlDocument добавляет еще ряд методов, которые позволяют создавать новые узлы:

    CreateNode: создает узел любого типа

    CreateElement: создает узел типа XmlDocument

    CreateAttribute: создает узел типа XmlAttribute

    CreateTextNode: создает узел типа XmlTextNode

    CreateComment: создает комментарий

Возьмем xml-документ из прошлой темы и добавим в него новый элемент:
*/

namespace System_Xml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load(@"users.xml");

            XmlElement xRoot = xDoc.DocumentElement;

            // создаем новый элемент user
            XmlElement userElem = xDoc.CreateElement("user");

            // создаем атрибут name
            XmlAttribute nameAttr = xDoc.CreateAttribute("name");

            // создаем элементы company и age
            XmlElement companyElem = xDoc.CreateElement("company");
            XmlElement ageElem = xDoc.CreateElement("age");

            // создаем текстовые значения для элементов и атрибута
            XmlText nameText = xDoc.CreateTextNode("Mark Zuckerberg");
            XmlText companyText = xDoc.CreateTextNode("Facebook");
            XmlText ageText = xDoc.CreateTextNode("30");

            //добавляем узлы
            nameAttr.AppendChild(nameText);
            companyElem.AppendChild(companyText);
            ageElem.AppendChild(ageText);

            userElem.Attributes.Append(nameAttr);
            userElem.AppendChild(companyElem);
            userElem.AppendChild(ageElem);

            xRoot.AppendChild(userElem);
            xDoc.Save(@"users.xml");

            Console.Read();
        }
    }
}
