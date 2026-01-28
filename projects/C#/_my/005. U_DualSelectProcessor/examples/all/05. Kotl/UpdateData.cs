using mpdv.Common.Data.DataManager;
using mpdv.Common.GUI.ApplicationFramework;
using mpdv.Common.GUI.Grids;
using mpdv.Common.mpdvSystem.CodeManagementFramework;
using mpdv.plugins.GridApplication;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace mpdv.plugins.ApplicationScripts {
  public class UpdateData {
    [ScriptPlugin("Update_Data" /*Указание параметра, при содании кнопки, Рис*/,
      "mpdv.plugins.ApplicationScripts." + nameof(UpdateData) /*Указание имени приложения (ну и класса скрипта соотв)*/,
      nameof(UpdateData.Update_Data) /*Обращаемся к нашему методу*/, "", 0, 1, 0, 0)]
    public static Object Update_Data(CodeDescriptorArgs args) {
      // 
      if (!(args.Values[nameof(ApplicationContainer)] is ApplicationContainerForEdit mainApp)) return null;

      // Получаем первую таблицу
      if (!(mainApp.ApplicationPlugins["Table1"] /*находим в нашем приложении таблицу по имени*/ is Grid grid1)) return null;
      if (!(grid1.GetControl("") is mpdvGrid { MainView: mpdvBandedGridView gridView1, DataSource: DataTable dataTable1 } mpdvGrid1)) return null;

      // Получаем вторую таблицу
      if (!(mainApp.ApplicationPlugins["Table2"] is Grid grid2)) return null;
      if (!(grid2.GetControl("") is mpdvGrid { MainView: mpdvBandedGridView gridView2, DataSource: DataTable dataTable2 } mpdvGrid2)) return null;

      DataRow[] dataRow1 = gridView1.GetSelectedRows()
        .Where(i => i >= 0 && i < dataTable1.Rows.Count)
        .Select(i => dataTable1.Rows[i])
        .ToArray(); // Если вдруг в таблице можно выбирать много строк, а так в принципе mpdvBandedGridView наследуется от GridView


      // Если вдруг манипуляции нужно какие то производить с данными и в итоге получаем dataTable
      DataTable dataTable = new DataTable();


      // Если хотите сразу обращаться к bapi
      foreach (DataRow row in dataTable.Rows) {
        mpdvDataManager.RequestData(new RequestParameter {
          FunctionId = "имя bapi.метод в bapi (например MODIFY)",
          ParamList = new List<mpdvParam> {
              new mpdvParam(/*указываем имя поля в bapi*/ "NAME1", /*указываем передаваемое значение*/ "0", /*указываем тип значения*/ "string"),
              new mpdvParam("NAME2", "0", "string"),
              new mpdvParam("DLGMODE", "AUTO", "string")
            }
        });
      }
      return null;
    }
  }
}