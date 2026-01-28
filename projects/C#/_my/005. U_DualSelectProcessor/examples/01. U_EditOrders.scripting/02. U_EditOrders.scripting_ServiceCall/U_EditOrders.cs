using mpdv.Common.Data.DataLogic;
using mpdv.Common.Data.DataManager;
using mpdv.Common.GUI.ApplicationFramework;
using mpdv.Common.mpdvSystem.CodeManagementFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Windows.Forms;

namespace mpdv.plugins.ApplicationScripts
{
    public class U_EditOrders
    {
        private const String APP_NAME = "U_EditOrders";

        // Плагины.
        private const String ORDER_GRID_PLUGIN_NAME = "MainGrid";
        private const String OPERATIONS_GRID_PLUGIN_NAME = "OperationGrid";

        // Источники данных.
        private const String ORDER_LIST_NAME = "BOOrderList";
        private const String OPERATION_LIST_NAME = "BOOperationList";

        // Наименования форм.
        public const String FORM_NAME_INSERT = "Insert";
        public const String FORM_NAME_UPDATE = "Update";
        public const String FORM_NAME_COPY = "InsertForCopy";

        public const String ACRONYM_ORDER_ID = "order.id";
        public const String ACRONYM_OPERATION_ID = "operation.id";

        [ScriptPlugin(U_EditOrders.APP_NAME + "AfterShowApplication", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.U_Alloys_AfterShowApplication), "", 0, 1, 0, 0)]
        public static Object U_Alloys_AfterShowApplication(CodeDescriptorArgs args)
        {
            if (!(args.Values["ApplicationContainer"] is ApplicationContainer mainApp)) return null;
            mainApp.WindowState = FormWindowState.Maximized;
            return null;
        }

        // >> Обработчик событий открытия окон "Insert", "Update", "Copy".
        // >> ВНИМАНИЕ: В текущей версии в этом методе также находится логика вызова сервиса.
        // >> Архитектурно это неверно - сервис будет вызываться при КАЖДОМ открытии формы,
        // >> а должен вызываться только по явному действию пользователя (нажатию кнопки).
        [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_UPDATE + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
        [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_COPY + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
        [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_INSERT + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
        public static Object Alloys_AfterOpenApplicationContainer(CodeDescriptorArgs args)
        {
            if (!(args.Values["Container"] is ApplicationContainerForEdit childApp)) return null;
            childApp.StartPosition = FormStartPosition.CenterParent;

            // Контейнер родительского приложения.
            var mainApp = childApp.ParentContainer;

            String order = null;
            String operation = null;

            // >> УЛУЧШЕННАЯ ПРОВЕРКА: Безопасное получение контроллеров и проверка выделения.
            // >> 1. Получаем оба контроллера из главного окна приложения.
            mpdvDataController dcOrder = mainApp.DataControllers[ORDER_LIST_NAME];
            mpdvDataController dcOperation = mainApp.DataControllers[OPERATION_LIST_NAME];

            // >> 2. Комплексная проверка за одно действие:
            // >>    - Существуют ли оба контроллера (dcOrder != null).
            // >>    - Есть ли в каждом из них выделенные строки (RowSelection?.Rows.Count > 0).
            // >>    Использование ?. (null-условный оператор) защищает от NullReferenceException.
            if (dcOrder == null || dcOperation == null ||
                dcOrder.Result?.RowSelection?.Rows.Count == 0 ||
                dcOperation.Result?.RowSelection?.Rows.Count == 0)
            {
                MessageBox.Show("Выделите строки в обоих таблицах!", "Внимание!");
                return null; // >> Прерываем выполнение метода, если условие не выполнено.
            }

            // >> ИЗВЛЕЧЕНИЕ ДАННЫХ: После успешной проверки можно безопасно обращаться к данным.
            // >> Гарантировано, что RowSelection существует и содержит как минимум одну строку.
            // >> Получаем первую (индекс 0) выделенную строку из каждого источника.
            DataRow orderRow = dcOrder.Result.RowSelection.Rows[0];
            DataRow operationRow = dcOperation.Result.RowSelection.Rows[0];

            // >> Получаем значения из конкретных ячеек (столбцов) по их акронимам.
            // >> Акронимы (например, "order.id") должны точно соответствовать именам в конфигурации MOC.
            order = orderRow[ACRONYM_ORDER_ID]?.ToString();
            operation = operationRow[ACRONYM_OPERATION_ID]?.ToString();

            // >> ОТЛАДОЧНЫЙ ВЫВОД: Проверка корректности извлеченных данных.
            if (!string.IsNullOrEmpty(order) && !string.IsNullOrEmpty(operation))
            {
                // Временная проверка - вывод в MessageBox
                MessageBox.Show($"Order: {order}, Operation: {operation}", "Проверка параметров");
            }

            // >> ВЫЗОВ СЕРВИСА MOC: Основная новая функциональность этой версии.
            // >> Сервис будет вызываться КАЖДЫЙ РАЗ при срабатывании этого обработчика (открытии формы).
            // >> В production-версии этот блок должен быть перенесен в метод, вызываемый по нажатию кнопки.
            try
            {
                mpdvResult result = mpdvDataManager.RequestData(new RequestParameter
                {
                    // >> FunctionId: Идентификатор сервиса или user exit в системе MOC.
                    // >> Убедитесь, что "MDWorkplanorder.insert" - это корректное имя нужного вам сервиса.
                    FunctionId = "MDWorkplanorder.insert",
                    ParamList = new List<mpdvParam>
                    {
                        // >> Параметры передаются в виде списка объектов mpdvParam.
                        // >> Формат конструктора: mpdvParam("ИмяПараметраВСервисе.param", Значение, "ТипДанных")
                        // >> Имена параметров ("workplanorder.article.param") и их типы должны точно
                        // >> соответствовать ожиданиям сервиса (указаны в его контракте в MRC).
                        new mpdvParam("workplanorder.article.param", order, "string"),
                        new mpdvParam("workplanorder.id.param", operation, "string")
                        // >> При необходимости сюда можно добавить другие обязательные параметры сервиса.
                    }
                });
                // >> РЕКОМЕНДАЦИЯ: После вызова стоит проверить свойство result.IsError
                // >> и вывести result.ErrorText для информирования пользователя об ошибках сервиса.
                // >> if (result != null && result.IsError) { MessageBox.Show(...); }
            }
            catch (Exception ex)
            {
                // >> ОБРАБОТКА ИСКЛЮЧЕНИЙ: Перехватывает ошибки на уровне сети, доступа к сервису и т.д.
                // >> Ошибки бизнес-логики, возвращаемые самим сервисом, обрабатываются выше (через result.IsError).
                MessageBox.Show($"Ошибка: {ex.Message}", "Ошибка!");
            }

            return null;
        }
    }
}