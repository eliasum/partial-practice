using System.Drawing;
using System.Xml.Serialization;
using System.Collections.Generic;

namespace XML
{
    // XmlRoot - Переименовывает корневой узел.
    [XmlRoot("MyButton")]      
    public class MyClass
    {
        private string id = "button";
        private int size = 10;
        private Point position = new Point(20, 30);
        private string password = "1234567890_password";
        private List<string> items = new List<string>();


        // XML узел переименовываем и делаем атрибутом.
        [XmlAttribute("SerialID")]   
        public string ID
        {
            get { return id; }
            set { id = value; }
        }

        // XML узел переименовываем и делаем атрибутом.
        [XmlAttribute("Length")]  
        public int Size
        {
            get { return size; }
            set { size = value; }
        }

        // XML узел переименовываем
        [XmlElement("Pos")]    
        public Point Position
        {
            get { return position; }
            set { position = value; }
        }

        // Исключаем свойство из процесса сериализации/десериализации.
       [XmlIgnore] 
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        // XML узел переименовываем
        [XmlArray("List")]
        // XML узел переименовываем и делаем атрибутом.
        [XmlArrayItem("Element")] 
        public List<string> Items
        {
            get { return items; }
            set { items = value; }
        }
    }
}
