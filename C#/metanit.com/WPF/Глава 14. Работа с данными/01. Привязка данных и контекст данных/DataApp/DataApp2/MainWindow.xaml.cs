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

namespace DataApp2
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    /*
    I

    При этом надо учитывать, что когда мы определяем простое свойство объекта в коде c#,
    то установить в качестве контекста данных мы можем его только там же в коде C#, как, 
    например, выше контекст данных устанавливается в конструкторе окна. Однако если мы 
    вместо простого свойства определим свойство зависимостей, тогда мы сможем устанавливать
    контекст данных и в коде xaml:
    */
    public partial class MainWindow : Window
    {
        public static readonly DependencyProperty PhoneProperty;

        public Phone Phone
        {
            get { return (Phone)GetValue(PhoneProperty); }
            set { SetValue(PhoneProperty, value); }
        }

        static MainWindow()
        {
            PhoneProperty = DependencyProperty.Register(
                "Phone",
                typeof(Phone),
                typeof(MainWindow));
        }

        public MainWindow()
        {
            InitializeComponent();

            Phone = new Phone
            {
                Name = "Lumia 630",
                Company = new Company { Title = "Microsoft" },
                Price = 1000
            };

        }
    }

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
}
