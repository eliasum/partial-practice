using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

/*2021.08.26 13:34 IMM*/

namespace DataApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    /*
    Определим в классе окна MainWindow свойство, которое будет представлять объект Phone:
    */
    public partial class MainWindow : Window
    {
        public Phone MyPhone { get; set; }

        public MainWindow()
        {
            InitializeComponent();

            MyPhone = new Phone
            {
                Name = "Lumia 630",
                Company = new Company { Title = "Microsoft" },
                Price = 1000
            };
            this.DataContext = MyPhone;
            /*
            Здесь установлено свойство DataContext класса MainWindow, после чего мы сможем
            получить значения из MyPhone в любом элементе в пределах MainWindow
            */
        }
    }

    /*
        I

        Работа с данными

    Привязка данных и контекст данных

    Большую роль при работе с данными играет механизм привязки. Ранее в одной из прошлых 
    тем рассматривалась привязка элементов и их свойств. В этой же теме сделаем бОльший 
    упор на привязку данных.

    Для создания привязки применяется элемент Binding и его свойства:

    - ElementName: имя элемента, к которому идет привязка. Если мы говорим о привязке 
    данных, то данное свойство задействуется редко за исключением тех случаев, когда
    данные определены в виде свойства в определенном элементе управления

    - Path: ссылка на свойство объекта, к которому идет привязка

    - Source: ссылка на источник данных, который не является элементом управления

    Свойства элемента Binding помогают установить источник привязки. Для установки источника
    или контекста данных в элементах управления WPF предусмотрено свойство DataContext. 
    Рассмотрим на примерах их использование.

    Пусть у нас в проекте определен следующий класс Phone:
    */
    public class Phone
    {
        public string Name { get; set; }
        public Company Company { get; set; }
        public decimal Price { get; set; }
    }

    public class Company
    {
        public string Title { get; set; }
    }
    /*
    Это сложный класс, который включает кроме простых данных типа string и decimal 
    также и сложный объект Company.
    */
}
