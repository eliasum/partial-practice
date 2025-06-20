﻿using System;

namespace FinalizationPattern
{
    public class MyClass : IDisposable
    {
        private bool disposed = false;

        // Реализация интерфейса IDisposable.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this); // Не вызывать деструктор.
        }
        protected virtual void Dispose(bool disposing)  //disposing=true; перегрузка метода Dispose()
        {
            if (!disposed)
            {
                if (disposing)  //Dispose(true);
                {
                    Console.WriteLine("Соединение с базой данных закрыто.");
                }
                disposed = true;
            }
        }
        ~MyClass()
        {
            Dispose(false);
            Console.WriteLine("Finalize");
        }
    }
}
