using mpdv.Common.Data.DataManager;
using mpdv.Common.GUI.ApplicationFramework;
using mpdv.Common.GUI.Grids;
using mpdv.Common.mpdvSystem.CodeManagementFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace mpdv.plugins.ApplicationScripts {
  public class NzhReport {
    [ScriptPlugin("<ScriptId>", "mpdv.plugins.ApplicationScripts.NzhReport", nameof(NzhReport.GetDataFromSelectedRows), "", 0, 1, 0, 0)]
    public static Object GetDataFromSelectedRows(CodeDescriptorArgs args) {
      if (!(args.Values["ApplicationContainer"] is ApplicationContainer mainApp)) return null;
      //TODO В данном фрагменте получаем объекты плагинов (таблицы) из которых далее будем искать данные.
      mainApp.ApplicationPlugins.TryGetValue("Заявка1", out IApplicationPlugin table1);
      mainApp.ApplicationPlugins.TryGetValue("Заявка2", out IApplicationPlugin table2);

      //TODO Плучаем контроллер таблицы из плагина.
      mpdvGrid grid1 = table1.GetControl("") as mpdvGrid;
      mpdvGrid grid2 = table2.GetControl("") as mpdvGrid;

      //TODO Получаем предстаавление для каждой из таблиц.
      mpdvBandedGridView mainView1 = grid1.MainView as mpdvBandedGridView;
      mpdvBandedGridView mainView2 = grid2.MainView as mpdvBandedGridView;

      //TODO  Мы получаем id (RowHandle) выделенных строк в каждой из таблиц.
      int[] selectedRows1 = mainView1.GetSelectedRows();
      int[] selectedRows2 = mainView2.GetSelectedRows();

      //TODO В данном фрагменте кода мы получаем представление выделенной строки.
      DataRowView row1 = mainView1.GetRow(selectedRows1.FirstOrDefault()) as DataRowView;
      DataRowView row2 = mainView2.GetRow(selectedRows2.FirstOrDefault()) as DataRowView;

      //TODO В примере выбирается только определенная колонка из таблицы.
      Object unit1 = row1.Row["units.unit"];
      Object unit2 = row2.Row["units.unit"];
      
      //TODO Пример вызова сервиса и передача в него полученных ранее параметров.
      mpdvResult result = mpdvDataManager.RequestData(new RequestParameter {
        FunctionId = "Имя сервиса",
        ParamList = new List<mpdvParam> {
          new mpdvParam("Имя параметра 1",    unit1, "string"),
          new mpdvParam("Имя параметра 2",    unit2, "string"),
        }
      });
      return null;
    }
  }
}