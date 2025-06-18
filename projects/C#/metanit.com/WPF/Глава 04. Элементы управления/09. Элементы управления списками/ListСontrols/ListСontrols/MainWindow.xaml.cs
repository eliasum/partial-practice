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

namespace ControlsApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            /*
            II

            Все элементы, размещенные внутри спискового элемента ListBox, представляют элементы списка.

            Коллекция объектов внутри элемента-списка доступна в виде свойства Items. Для управления элементами 
            из этой коллекции мы можем использовать следующие методы:

            - Add(object item): добавление элемента

            - Clear(): полная очистка коллекции

            - Insert(int index, object item): вставка элемента по определенному индексу в коллекции

            - Remove(object item): удаление элемента

            - RemoveAt(int index): удаление элемента по индексу

            А свойство Count позволяет узнать, сколько элементов в коллекции.

                Например, применительно к вышеопределенному списку мы бы могли написать в коде C#:
            
            list.Items.Add("LG G5");
            list.Items.RemoveAt(1); // удаляем второй элемент
            */

            /*
            IV

            А в файле отделенного кода выполним наполнение списка:
            
            string[] phones = { "iPhone 6S", "Lumia 950", "Nexus 5X", "LG G4", "Xiaomi MI5", "HTC A9" };
            list.ItemsSource = phones;
            */

            /*
            Свойство ItemsSource в качестве значения принимает массив, хотя это моет быть и список 
            типа List. И каждый элемент этого массива переходит в ListBox.

            Еще одно важное свойство списковых элементов - это свойство DisplayMemberPath. Оно 
            позволяет выбирать для отображения элементов значение одного из свойств объекта. 
            Например, создадим в коде новый класс Phone:
            */

            /*
            VI

            То же самое мы бы могли сделать программным способом:
            
            list.ItemsSource = new List<Phone>
            {
                new Phone { Title="iPhone 6S", Company="Apple", Price=54990 },
                new Phone {Title="Lumia 950", Company="Microsoft", Price=39990 },
                new Phone {Title="Nexus 5X", Company="Google", Price=29990 }
            };

            list.DisplayMemberPath = "Title";
            */
        }

        /*
        Все элементы управления списками поддерживают выделение входящих элементов. Выделенный 
        элемент(ы) можно получить с помощью свойств SelectedItem(SelectedItems), а получить индекс
        выделенного элемента - с помощью свойства SelectedIndex. Свойство SelectedValue позволяет 
        получить значение выделенного элемента.

        При выделении элемента в списке генерируется событие SelectionChanged, которое мы можем 
        обработать. Например, возьмем предыдущий список:


        <ListBox Name="list" DisplayMemberPath="Title" SelectionChanged="list_Selected">
            <local:Phone Title="iPhone 6S" Company="Apple" Price="54990" />
            <local:Phone Title="Lumia 950" Company="Microsoft" Price="39990" />
            <local:Phone Title="Nexus 5X" Company="Google" Price="29990" />
        </ListBox>

        А в файле кода определим обработчик для этого события:
        */

        private void List_Selected(object sender, RoutedEventArgs e)
        {
            Phone p = (Phone)list.SelectedItem;
            MessageBox.Show(p.Title);
        }

        /*
        Важно учитывать, что так как в разметке xaml в списке определены элементы Phone, то в коде
        мы можем привести объект list.SelectedItem к типу Phone.
        */
    }

    class Phone
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public int Price { get; set; }
    }
}
