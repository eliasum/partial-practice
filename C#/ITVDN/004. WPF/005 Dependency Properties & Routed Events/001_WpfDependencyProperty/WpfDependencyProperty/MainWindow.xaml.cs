using System.Windows;

namespace WpfDependencyProperty
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        // v1.0
        // Объект со свойством зависимости.
        //SimpleProperty _testObject = new SimpleProperty();
        // v2.0
        // Объект со свойством зависимости. Со
        //значением по умолчанию и проверкой правильности данных.
        PropertyMetadata _testObject = new PropertyMetadata(); 


        public MainWindow()
        {
            InitializeComponent();
        }

        // Установить значение свойству.
        private void button1_Click(object sender, RoutedEventArgs e)
        {
            _testObject.TestData = textBox1.Text;
            textBox1.Text = string.Empty;
        }

        // Прочитать значение свойства.
        private void button2_Click(object sender, RoutedEventArgs e)
        {
            textBox1.Text = _testObject.TestData;
        }

        // Очистить значение свойства.
        private void button3_Click(object sender, RoutedEventArgs e)
        {
            // Если свойство зависимостей создавалось с метаданными, которые указывали значение по умолчанию,
            // то вызов ClearValue() установит значение по умолчанию
            // v1.0
            //_testObject.ClearValue(SimpleProperty.TestDataProperty);
            // v2.0
            _testObject.ClearValue(PropertyMetadata.TestDataProperty);
        }
    }
}


