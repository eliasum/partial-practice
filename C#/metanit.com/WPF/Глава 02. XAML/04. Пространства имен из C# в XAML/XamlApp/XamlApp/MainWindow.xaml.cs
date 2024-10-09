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

namespace XamlApp
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            /*
                через метод InitializeComponent() класс MainWindow вызывает скомпилированный ранее
                код XAML, разбирает его и по нему строит графический интерфейс окна 
            */
            InitializeComponent();
        }
    }

    /*
    2021.08.06 16:50 IMM
    
    I    
    
    Пространства имен из C# в XAML

    По умолчанию в WPF в XAML подключается предустановленный набор пространств имен xml. Но мы можем задействовать 
    любые другие пространства имен и их функциональность в том числе и стандартные пространства имен платформы .NET,
    например, System или System.Collections. Например, по умолчанию в определении элемента Window подключается 
    локальное пространство имен:

    xmlns:local="clr-namespace:XamlApp"

    Локальное пространство имен, как правило, называется по имени проекта (в моем случае проект называется XamlApp) 
    и позволяет подключить все классы, которые определены в коде C# в нашем проекте. Например, добавим в проект 
    следующий класс:
     */

    public class Phone
    {
        public string Name { get; set; }
        public int Price { get; set; }

        public override string ToString()
        {
            return $"Смартфон {this.Name}; цена: {this.Price}";
        }
    }
}
