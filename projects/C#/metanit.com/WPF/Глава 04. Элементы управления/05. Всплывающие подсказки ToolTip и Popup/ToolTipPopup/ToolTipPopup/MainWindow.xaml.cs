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

namespace ToolTipPopup
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        /*
        ToolTip toolTip = new ToolTip();
        StackPanel toolTipPanel = new StackPanel();
        toolTipPanel.Children.Add(new TextBlock { Text = "Заголовок", FontSize=16 });
        toolTipPanel.Children.Add(new TextBlock { Text = "Текст" });
        toolTip.Content = toolTipPanel;
        button1.ToolTip = toolTip;
        */
    }
}
