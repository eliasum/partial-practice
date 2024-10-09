using System;
using System.Globalization;

// Использование интерфейса IFormattable.

namespace StringBasics
{
    public class Temperature : IFormattable
    {
        private decimal temperature;

        // конструктор класса Temperature
        public Temperature(decimal temperature)
        {
            if (temperature < -273.15m) 
            {
                // По шкале Цельсия абсолютному нулю соответствует температура −273,15 °C
                throw new ArgumentOutOfRangeException(
                    String.Format("{0} is less than absolute zero.", temperature));
            }
            this.temperature = temperature;
        }
        
        public decimal Celsius
        {
            get { return temperature; }
        }

        public decimal Fahrenheit
        {
            // Перевод Цельсия в Фаренгейт.
            get { return temperature * 9 / 5 + 32; }
        }

        public decimal Kelvin
        {
            // Перевод Цельсия в Кельвин.
            get { return temperature + 273.15m; }
        }

        // переопределяем метод ToString() из базового класса Object
        public override string ToString()
        {
            /*
            Реализация интерфейса IFormattable, класс CultureInfo реализует
            интерфейс IFormatProvider, CultureInfo.CurrentCulture - все 
            региональные параметры
            */
            return this.ToString("G", CultureInfo.CurrentCulture);
        }

        /*
        альтернативный метод переопределения метода ToString() из базового класса Object
        с одним аргументом
        */
        //public string ToString(string format)
        //{
        //    /*
        //    Реализация интерфейса IFormattable, класс CultureInfo реализует
        //    интерфейс IFormatProvider
        //    */
        //    return this.ToString(format, CultureInfo.CurrentCulture);
        //}

        /*
        Реализация интерфейса IFormattable, т.к. в интерфейсе IFormattable
        представлен только метод 
        string ToString(string format, IFormatProvider formatProvider);
        который обязательно должен быть реализован в классе, который реализует
        данный интерфейс.
        */
        // Сводка:
        //     Форматирует значение текущего экземпляра с использованием заданного
        //формата.
        //
        // Параметры:
        //   format:
        //     Используемый формат.-или- Пустая ссылка для использования формата по
        //умолчанию, определенного для типа реализации System.IFormattable.
        //
        //   formatProvider:
        //     Поставщик, используемый для форматирования значения.-или- Пустая
        //ссылка для получения сведений о формате чисел из текущего установленного
        // в операционной системе языкового стандарта.
        //
        // Возврат:
        //     Значение текущего экземпляра в указанном формате.
        public string ToString(string format, IFormatProvider provider)
        {
            if (String.IsNullOrEmpty(format))   // если формат пустой
                format = "G";

            if (provider == null)   // если поставщика нет
                provider = CultureInfo.CurrentCulture;

            // выражение сравнения конвертируется в верхний регистр
            switch (format.ToUpperInvariant())
            {
                case "G":
                case "C":
                    // F2 - формат вывода вещественного числа (2 знака после запятой).
                    return temperature.ToString("F2", provider) + " °C"; 
                case "F":
                    return Fahrenheit.ToString("F2", provider) + " °F";
                case "K":
                    return Kelvin.ToString("F2", provider) + " K";
                default:
                    throw new FormatException(
                        String.Format("The {0} format string is not supported.", format));
            }
        }
    }

    class Program
    {
        static void Main()
        {
            var temperature = new Temperature(12); // 12°C

            // вывод температуры в формате по умолчанию (°C)
            Console.WriteLine("Temperature [default]     = {0}", temperature);

            // вывод температуры в формате градусов Кельвина
            Console.WriteLine("Temperature [Kelvin]      = {0:K}", temperature);

            /*
            вывод температуры в формате градусов Фаренгейта и региональных 
            параметров США
            */
            Console.WriteLine("Temperature [CultureInfo] = {0}", 
                temperature.ToString("F", CultureInfo.CreateSpecificCulture("en-US")));

            /*
            вывод температуры в формате градусов Цельсия и региональных 
            параметров РФ
            */
            Console.WriteLine("Temperature [CultureInfo] = {0}", 
                temperature.ToString("C", CultureInfo.CreateSpecificCulture("ru-RU")));

            // Delay.
            Console.ReadKey();
        }
    }
}