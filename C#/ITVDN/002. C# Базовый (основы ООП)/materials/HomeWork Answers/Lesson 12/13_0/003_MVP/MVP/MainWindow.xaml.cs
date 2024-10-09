using System;
using System.Windows;

// View

namespace MVP
{    
    public partial class MainWindow : Window
    {
        private EventHandler myEvemt = null;
        public MainWindow()
        {
            InitializeComponent();
            new Presenter(this);
        }

        internal Presenter Presenter
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
            }
        }

        public event EventHandler MyEvent
        {
            add { myEvemt += value; }
            remove { myEvemt -= value; }
        }

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            myEvemt.Invoke(sender, e);
        }
    }
}
