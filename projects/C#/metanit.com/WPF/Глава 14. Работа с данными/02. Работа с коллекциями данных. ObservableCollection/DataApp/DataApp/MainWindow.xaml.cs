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

namespace DataApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    /*
    2021.08.26 15:01 IMM

    I

    Работа с коллекциями данных. ObservableCollection

    В прошлых темах были рассмотрены примеры привязки отдельных объектов к элементам 
    интерфейса. Но, как правило, приложения оперируют не одиночными данными, а большими
    наборами, коллекциями объектов. Для работы непосредственно с наборами данных в WPF
    определены различные элементы управления списками, такие как ListBox, ListView, 
    DataGrid, TreeView, ComboBox.

    Их отличительной особенностью является то, что они наследуются от базового класса
    ItemsControl и поэтому наследуют ряд общей функциональности для работы с данными.
    Прежде всего можно выделить свойства:

    - Items: устанавливает набор объектов внутри элемента

    - ItemsSource: ссылка на источник данных

    - ItemStringFormat: формат, который будет использоваться для форматирования строк, 
    например, при переводе в строку числовых значений

    - ItemContainerStyle: стиль, который устанавливается для контейнера каждого элемента
    (например, для ListBoxItem или ComboBoxItem)

    - ItemTemplate: представляет шаблон данных, который используется для отображения
    элементов

    ItemsPanel: панель, которая используется для отображения данных. Как правило, 
    применяется VirtualizingStackPanel

    DisplayMemberPath: свойство, которое будет использоваться для отображения в списке 
    каждого объекта

    При работе с элементами управления списками важно понимать, что эти элементы 
    предназначены прежде всего для отображения данных, а не для хранения. В каких-то 
    ситуациях мы, конечно, можем определять небольшие списки непосредственно внутри
    элемента. Например:
	
    <ListBox>
        <ListBox.Items>
            <ListBoxItem>iPhone 6S Plus</ListBoxItem>
            <ListBoxItem>Nexus 6P</ListBoxItem>
            <ListBoxItem>Galaxy S7 Edge</ListBoxItem>
        </ListBox.Items>
    </ListBox>

    Но в большинстве случае предпочтительнее использовать привязку к спискам и разделять 
    источник данных от их представления или визуализации. Например, определим ListBox:
	
    <ListBox x:Name="phonesList" />

    А в коде c# создадим источник данных и установим привязку к нему:
    */
    public partial class MainWindow : Window
    {
        List<string> phones;

        public MainWindow()
        {
            InitializeComponent();

            phones = new List<string> { "iPhone 6S Plus", "Nexus 6P", "Galaxy S7 Edge" };
            phonesList.ItemsSource = phones;
        }
    }
}
