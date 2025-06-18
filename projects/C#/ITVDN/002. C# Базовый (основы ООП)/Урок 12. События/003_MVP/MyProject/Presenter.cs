using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyProject
{
    class Presenter
    {
        Model model;

        MainWindow mainWindow;

        public Presenter(MainWindow mainWindow)
        {
            this.mainWindow = mainWindow;
            this.model = new Model();
            this.mainWindow.SomeEvent += new EventHandler(mainWindow_SomeEvent);
        }

        void mainWindow_SomeEvent(object sender, EventArgs e)
        {
            this.mainWindow.textBox1.Text = this.model.SomeMethod(this.mainWindow.textBox1.Text);
        }
    }
}
