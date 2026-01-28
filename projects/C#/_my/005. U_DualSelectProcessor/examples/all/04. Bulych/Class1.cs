using System;
using System.Windows.Forms;
using System.Collections.Generic;
using mpdv.Common.GUI.ApplicationFramework;
using mpdv.Common.mpdvSystem.CodeManagementFramework;
using mpdv.Common.Data.DataLogic;
using DevExpress.XtraEditors;
using mpdv.Common.Data.DataManager;
namespace mpdv.plugins.ApplicationScripts
{
    public class Class1
    {
		[ScriptPlugin("<Имя_функции_на_кнопке>", "mpdv.plugins.ApplicationScripts.Class1", "Имя_метода", "", 0, 1, 0, 0)]
		public static object Имя_метода(CodeDescriptorArgs args)
		{
			if (!(args.Values["ApplicationContainer"] is ApplicationContainerForDisplay mainApp)) return null;

			//ApplicationContainerForDisplay container = (ApplicationContainerForDisplay)args.Values["ApplicationContainer"]; //Извлечение контейнера приложения
			mpdvDataController dataController1;
			mpdvDataController dataController2;
			mainApp.DataControllers.TryGetValue("<Имя_источника_данных1>", out dataController1); //Извлечение источникков данных
			mainApp.DataControllers.TryGetValue("<Имя_источника_данных2>", out dataController2);
			Object value1 = null;
			Object value2 = null;
			if (dataController1.Result.RowSelection.Rows.Count == 0 || dataController2.Result.RowSelection.Rows.Count == 0) //Проверка на выбор строк в обеих таблиц
			{
				XtraMessageBox.Show("Выделите строки в обоих таблицах!", "Внимание!", MessageBoxButtons.OK, MessageBoxIcon.Information);
			}
			else
			{
				value1 = dataController1.Result.RowSelection.Rows[0]["Имя_столбца_источника_данных1"]; //Получение данных из таблиц
				value2 = dataController2.Result.RowSelection.Rows[0]["Имя_столбца_источника_данных2"];
				try
				{
					mpdvDataManager.RequestData(new RequestParameter            //Отправка данных на примере сервиса создания техкарт
					{
						FunctionId = "MDWorkplanorder.insert",
						ParamList = new List<mpdvParam>
						{
							new mpdvParam("workplanorder.article.op", "EQUAL", "string"), // mpdvParam("Имя_параметра_в_сервисе.op", "EQUAL", "string") + 
							new mpdvParam("workplanorder.article.param", value1, "string"), //mpdvParam("Имя_параметра_в_сервисе.param", <Данные>, "Тип_данных") тип данных должен совпадать с типом в описании сервиса в MRC
							new mpdvParam("workplanorder.id.op", "EQUAL", "string"),
							new mpdvParam("workplanorder.id.param", value2, "string")
						}
					});
				}
				catch
				{
					XtraMessageBox.Show("Возникла ошибка при отправке данных.", "Внимание!", MessageBoxButtons.OK, MessageBoxIcon.Information);
				}
			}
			return null;
		}
	}
}
