using mpdv.Common.Data.DataLogic;
using mpdv.Common.GUI.ApplicationFramework;
using mpdv.Common.mpdvSystem.CodeManagementFramework;
using System;
using System.Data;
using System.Windows.Forms;

namespace mpdv.plugins.ApplicationScripts {
  public class U_EditOrders {
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
    public static Object U_Alloys_AfterShowApplication(CodeDescriptorArgs args) {
      if (!(args.Values["ApplicationContainer"] is ApplicationContainer mainApp)) return null;
      mainApp.WindowState = FormWindowState.Maximized;
      return null;
    }

    [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_UPDATE + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
    [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_COPY + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
    [ScriptPlugin(U_EditOrders.APP_NAME + U_EditOrders.FORM_NAME_INSERT + "AfterLoadConfiguration", "mpdv.plugins.ApplicationScripts." + U_EditOrders.APP_NAME, nameof(U_EditOrders.Alloys_AfterOpenApplicationContainer), "", 0, 1, 0, 0)]
    public static Object Alloys_AfterOpenApplicationContainer(CodeDescriptorArgs args) {
      if (!(args.Values["Container"] is ApplicationContainerForEdit childApp)) return null;
      childApp.StartPosition = FormStartPosition.CenterParent;

      // Контейнер родительского приложения.
      var mainApp = childApp.ParentContainer;

      // Источник данных по заказам.
      mpdvDataController dcOrder = mainApp.DataControllers[U_EditOrders.ORDER_LIST_NAME];

      String order = null;
      String operation = null;

            // Получаем данные по выделенной строке заказов.
            if (dcOrder != null) {
        DataTable rowSelection = dcOrder?.Result?.RowSelection;

        if (rowSelection != null && rowSelection?.Rows.Count > 0) {
          DataRow row = rowSelection?.Rows[0];
          order = row[U_EditOrders.ACRONYM_ORDER_ID]?.ToString();
        }
      }

      // Источник данных по операциям.
      mpdvDataController dcOperation = mainApp.DataControllers[U_EditOrders.OPERATION_LIST_NAME];

      // Получаем данные по выделенной строке операций.
      if (dcOperation != null) {
        DataTable rowSelection = dcOperation?.Result?.RowSelection;

        if (rowSelection != null && rowSelection?.Rows.Count > 0) {
          DataRow row = rowSelection?.Rows[0];
          operation = row[U_EditOrders.ACRONYM_OPERATION_ID]?.ToString();
        }
      }

        if (!string.IsNullOrEmpty(order) && !string.IsNullOrEmpty(operation))
        {
            // Временная проверка - вывод в MessageBox
            MessageBox.Show($"Order: {order}, Operation: {operation}", "Проверка параметров");
        }

        return null;
    }
  }
}