using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_QUERY_STOCK_EXCEL
    {
        public responce_ZMOV_QUERY_STOCK_EXCEL sapRun(request_ZMOV_QUERY_STOCK_EXCEL import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_QUERY_STOCK_EXCEL");

            /*rfcFunction.SetValue("LGORT", import.LGORT);
            rfcFunction.SetValue("WERKS", import.WERKS);
            IRfcTable rfcTable_STOCK_I = rfcFunction.GetTable("STOCK");
            foreach (ZMOV_QUERY_STOCK_EXCEL_STOCK row in import.STOCK)
            {
                rfcTable_STOCK_I.Append();
                ZMOV_QUERY_STOCK_EXCEL_STOCK datoTabla = new ZMOV_QUERY_STOCK_EXCEL_STOCK();
                rfcTable_STOCK_I.SetValue("MATNR", row.MATNR);
                rfcTable_STOCK_I.SetValue("MAKTX", row.MAKTX);
                rfcTable_STOCK_I.SetValue("WERKS", row.WERKS);
                rfcTable_STOCK_I.SetValue("LGORT", row.LGORT);
                rfcTable_STOCK_I.SetValue("CHARG", row.CHARG);
                rfcTable_STOCK_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_STOCK_I.SetValue("MEINS", row.MEINS);
                rfcTable_STOCK_I.SetValue("CLABS", row.CLABS);
                rfcTable_STOCK_I.SetValue("LIFNR", row.LIFNR);
                rfcTable_STOCK_I.SetValue("NAME1", row.NAME1);
                rfcTable_STOCK_I.SetValue("ZNUEZ_VARIEDAD", row.ZNUEZ_VARIEDAD);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CATEGORIA", row.ZNUEZ_CATEGORIA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALIBRE", row.ZNUEZ_CALIBRE);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIFICACION", row.ZNUEZ_CLASIFICACION);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CUARTEL", row.ZNUEZ_CUARTEL);
                rfcTable_STOCK_I.SetValue("ZNUEZ_EST_FUMIGADO", row.ZNUEZ_EST_FUMIGADO);
                rfcTable_STOCK_I.SetValue("ZNUEZ_NUMEXPORTA", row.ZNUEZ_NUMEXPORTA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_ANTIGUEDAD", row.ZNUEZ_ANTIGUEDAD);
                rfcTable_STOCK_I.SetValue("ZNUEZ_GUIA", row.ZNUEZ_GUIA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_BDJA", row.ZNUEZ_CLASIF_BDJA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_RENDPULP", row.ZNUEZ_RENDPULP);
                rfcTable_STOCK_I.SetValue("ZNUEZ_HUMPOND", row.ZNUEZ_HUMPOND);
                rfcTable_STOCK_I.SetValue("ZNUEZ_HUMPULPA", row.ZNUEZ_HUMPULPA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_DANOEXT", row.ZNUEZ_DANOEXT);
                rfcTable_STOCK_I.SetValue("ZNUEZ_DANOINT", row.ZNUEZ_DANOINT);
                rfcTable_STOCK_I.SetValue("ZNUEZ_EXPO_CC", row.ZNUEZ_EXPO_CC);
                rfcTable_STOCK_I.SetValue("ZNUEZ_EXPO_PP", row.ZNUEZ_EXPO_PP);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_A", row.ZNUEZ_CALC_A);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_B", row.ZNUEZ_CALC_B);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_C", row.ZNUEZ_CALC_C);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_D", row.ZNUEZ_CALC_D);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_E", row.ZNUEZ_CALC_E);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CALC_F", row.ZNUEZ_CALC_F);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_A", row.ZNUEZ_CLASIF_A);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_B", row.ZNUEZ_CLASIF_B);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_C", row.ZNUEZ_CLASIF_C);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_D", row.ZNUEZ_CLASIF_D);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_E", row.ZNUEZ_CLASIF_E);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_F", row.ZNUEZ_CLASIF_F);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_G", row.ZNUEZ_CLASIF_G);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_H", row.ZNUEZ_CLASIF_H);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_I", row.ZNUEZ_CLASIF_I);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_J", row.ZNUEZ_CLASIF_J);
                rfcTable_STOCK_I.SetValue("ZNUEZ_CLASIF_K", row.ZNUEZ_CLASIF_K);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_EL", row.ZNUEZ_COLOR_EL);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_L", row.ZNUEZ_COLOR_L);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_LA", row.ZNUEZ_COLOR_LA);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_A", row.ZNUEZ_COLOR_A);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_Y", row.ZNUEZ_COLOR_Y);
                rfcTable_STOCK_I.SetValue("ZNUEZ_COLOR_D", row.ZNUEZ_COLOR_D);
            }
            rfcFunction.SetValue("STOCK", rfcTable_STOCK_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();*/
            responce_ZMOV_QUERY_STOCK_EXCEL res = new responce_ZMOV_QUERY_STOCK_EXCEL();
            IRfcTable rfcTable_LGORT = rfcFunction.GetTable("LGORT");
            res.LGORT = new ZMOV_QUERY_STOCK_EXCEL_LGORT[rfcTable_LGORT.RowCount];
            int i_LGORT = 0;
            foreach (IRfcStructure row in rfcTable_LGORT)
            {
                ZMOV_QUERY_STOCK_EXCEL_LGORT datoTabla = new ZMOV_QUERY_STOCK_EXCEL_LGORT();
                datoTabla.SIGN = row.GetString("SIGN");
                datoTabla.OPTION = row.GetString("OPTION");
                datoTabla.STLOC_LOW = row.GetString("STLOC_LOW");
                datoTabla.STLOC_HIGH = row.GetString("STLOC_HIGH");
                res.LGORT[i_LGORT] = datoTabla; ++i_LGORT;
            }
            IRfcTable rfcTable_WERKS = rfcFunction.GetTable("WERKS");
            res.WERKS = new ZMOV_QUERY_STOCK_EXCEL_WERKS[rfcTable_WERKS.RowCount];
            int i_WERKS = 0;
            foreach (IRfcStructure row in rfcTable_WERKS)
            {
                ZMOV_QUERY_STOCK_EXCEL_WERKS datoTabla = new ZMOV_QUERY_STOCK_EXCEL_WERKS();
                datoTabla.SIGN = row.GetString("SIGN");
                datoTabla.OPTION = row.GetString("OPTION");
                datoTabla.LOW = row.GetString("LOW");
                datoTabla.HIGH = row.GetString("HIGH");
                res.WERKS[i_WERKS] = datoTabla; ++i_WERKS;
            }
            IRfcTable rfcTable_STOCK = rfcFunction.GetTable("STOCK");
            res.STOCK = new ZMOV_QUERY_STOCK_EXCEL_STOCK[rfcTable_STOCK.RowCount];
            int i_STOCK = 0;
            foreach (IRfcStructure row in rfcTable_STOCK)
            {
                ZMOV_QUERY_STOCK_EXCEL_STOCK datoTabla = new ZMOV_QUERY_STOCK_EXCEL_STOCK();
                datoTabla.MATNR = row.GetString("MATNR");
                datoTabla.MAKTX = row.GetString("MAKTX");
                datoTabla.WERKS = row.GetString("WERKS");
                datoTabla.LGORT = row.GetString("LGORT");
                datoTabla.CHARG = row.GetString("CHARG");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.MEINS = row.GetString("MEINS");
                datoTabla.CLABS = row.GetDecimal("CLABS");
                datoTabla.LIFNR = row.GetString("LIFNR");
                datoTabla.NAME1 = row.GetString("NAME1");
                datoTabla.ZNUEZ_VARIEDAD = row.GetString("ZNUEZ_VARIEDAD");
                datoTabla.ZNUEZ_CATEGORIA = row.GetString("ZNUEZ_CATEGORIA");
                datoTabla.ZNUEZ_CALIBRE = row.GetString("ZNUEZ_CALIBRE");
                datoTabla.ZNUEZ_CLASIFICACION = row.GetString("ZNUEZ_CLASIFICACION");
                datoTabla.ZNUEZ_CUARTEL = row.GetString("ZNUEZ_CUARTEL");
                datoTabla.ZNUEZ_EST_FUMIGADO = row.GetString("ZNUEZ_EST_FUMIGADO");
                datoTabla.ZNUEZ_NUMEXPORTA = row.GetString("ZNUEZ_NUMEXPORTA");
                datoTabla.ZNUEZ_ANTIGUEDAD = row.GetString("ZNUEZ_ANTIGUEDAD");
                datoTabla.ZNUEZ_GUIA = row.GetString("ZNUEZ_GUIA");
                datoTabla.ZNUEZ_CLASIF_BDJA = row.GetString("ZNUEZ_CLASIF_BDJA");
                datoTabla.ZNUEZ_RENDPULP = row.GetDecimal("ZNUEZ_RENDPULP");
                datoTabla.ZNUEZ_HUMPOND = row.GetDecimal("ZNUEZ_HUMPOND");
                datoTabla.ZNUEZ_HUMPULPA = row.GetDecimal("ZNUEZ_HUMPULPA");
                datoTabla.ZNUEZ_DANOEXT = row.GetDecimal("ZNUEZ_DANOEXT");
                datoTabla.ZNUEZ_DANOINT = row.GetDecimal("ZNUEZ_DANOINT");
                datoTabla.ZNUEZ_EXPO_CC = row.GetDecimal("ZNUEZ_EXPO_CC");
                datoTabla.ZNUEZ_EXPO_PP = row.GetDecimal("ZNUEZ_EXPO_PP");
                datoTabla.ZNUEZ_CALC_A = row.GetDecimal("ZNUEZ_CALC_A");
                datoTabla.ZNUEZ_CALC_B = row.GetDecimal("ZNUEZ_CALC_B");
                datoTabla.ZNUEZ_CALC_C = row.GetDecimal("ZNUEZ_CALC_C");
                datoTabla.ZNUEZ_CALC_D = row.GetDecimal("ZNUEZ_CALC_D");
                datoTabla.ZNUEZ_CALC_E = row.GetDecimal("ZNUEZ_CALC_E");
                datoTabla.ZNUEZ_CALC_F = row.GetDecimal("ZNUEZ_CALC_F");
                datoTabla.ZNUEZ_CLASIF_A = row.GetDecimal("ZNUEZ_CLASIF_A");
                datoTabla.ZNUEZ_CLASIF_B = row.GetDecimal("ZNUEZ_CLASIF_B");
                datoTabla.ZNUEZ_CLASIF_C = row.GetDecimal("ZNUEZ_CLASIF_C");
                datoTabla.ZNUEZ_CLASIF_D = row.GetDecimal("ZNUEZ_CLASIF_D");
                datoTabla.ZNUEZ_CLASIF_E = row.GetDecimal("ZNUEZ_CLASIF_E");
                datoTabla.ZNUEZ_CLASIF_F = row.GetDecimal("ZNUEZ_CLASIF_F");
                datoTabla.ZNUEZ_CLASIF_G = row.GetDecimal("ZNUEZ_CLASIF_G");
                datoTabla.ZNUEZ_CLASIF_H = row.GetDecimal("ZNUEZ_CLASIF_H");
                datoTabla.ZNUEZ_CLASIF_I = row.GetDecimal("ZNUEZ_CLASIF_I");
                datoTabla.ZNUEZ_CLASIF_J = row.GetDecimal("ZNUEZ_CLASIF_J");
                datoTabla.ZNUEZ_CLASIF_K = row.GetDecimal("ZNUEZ_CLASIF_K");
                datoTabla.ZNUEZ_COLOR_EL = row.GetDecimal("ZNUEZ_COLOR_EL");
                datoTabla.ZNUEZ_COLOR_L = row.GetDecimal("ZNUEZ_COLOR_L");
                datoTabla.ZNUEZ_COLOR_LA = row.GetDecimal("ZNUEZ_COLOR_LA");
                datoTabla.ZNUEZ_COLOR_A = row.GetDecimal("ZNUEZ_COLOR_A");
                datoTabla.ZNUEZ_COLOR_Y = row.GetDecimal("ZNUEZ_COLOR_Y");
                datoTabla.ZNUEZ_COLOR_D = row.GetDecimal("ZNUEZ_COLOR_D");
                res.STOCK[i_STOCK] = datoTabla; ++i_STOCK;
            }

            return res;
        }
    }
    public class request_ZMOV_QUERY_STOCK_EXCEL
    {
        public ZMOV_QUERY_STOCK_EXCEL_LGORT[] LGORT;
        public ZMOV_QUERY_STOCK_EXCEL_WERKS[] WERKS;
    }
    public class responce_ZMOV_QUERY_STOCK_EXCEL
    {
        public ZMOV_QUERY_STOCK_EXCEL_LGORT[] LGORT;
        public ZMOV_QUERY_STOCK_EXCEL_WERKS[] WERKS;
        public ZMOV_QUERY_STOCK_EXCEL_STOCK[] STOCK;
    }
    public class ZMOV_QUERY_STOCK_EXCEL_LGORT
    {
        public String SIGN;
        public String OPTION;
        public String STLOC_LOW;
        public String STLOC_HIGH;
    }
    public class ZMOV_QUERY_STOCK_EXCEL_WERKS
    {
        public String SIGN;
        public String OPTION;
        public String LOW;
        public String HIGH;
    }
    public class ZMOV_QUERY_STOCK_EXCEL_STOCK
    {
        public String MATNR;
        public String MAKTX;
        public String WERKS;
        public String LGORT;
        public String CHARG;
        public String HSDAT;
        public String MEINS;
        public Decimal CLABS;
        public String LIFNR;
        public String NAME1;
        public String ZNUEZ_VARIEDAD;
        public String ZNUEZ_CATEGORIA;
        public String ZNUEZ_CALIBRE;
        public String ZNUEZ_CLASIFICACION;
        public String ZNUEZ_CUARTEL;
        public String ZNUEZ_EST_FUMIGADO;
        public String ZNUEZ_NUMEXPORTA;
        public String ZNUEZ_ANTIGUEDAD;
        public String ZNUEZ_GUIA;
        public String ZNUEZ_CLASIF_BDJA;
        public Decimal ZNUEZ_RENDPULP;
        public Decimal ZNUEZ_HUMPOND;
        public Decimal ZNUEZ_HUMPULPA;
        public Decimal ZNUEZ_DANOEXT;
        public Decimal ZNUEZ_DANOINT;
        public Decimal ZNUEZ_EXPO_CC;
        public Decimal ZNUEZ_EXPO_PP;
        public Decimal ZNUEZ_CALC_A;
        public Decimal ZNUEZ_CALC_B;
        public Decimal ZNUEZ_CALC_C;
        public Decimal ZNUEZ_CALC_D;
        public Decimal ZNUEZ_CALC_E;
        public Decimal ZNUEZ_CALC_F;
        public Decimal ZNUEZ_CLASIF_A;
        public Decimal ZNUEZ_CLASIF_B;
        public Decimal ZNUEZ_CLASIF_C;
        public Decimal ZNUEZ_CLASIF_D;
        public Decimal ZNUEZ_CLASIF_E;
        public Decimal ZNUEZ_CLASIF_F;
        public Decimal ZNUEZ_CLASIF_G;
        public Decimal ZNUEZ_CLASIF_H;
        public Decimal ZNUEZ_CLASIF_I;
        public Decimal ZNUEZ_CLASIF_J;
        public Decimal ZNUEZ_CLASIF_K;
        public Decimal ZNUEZ_COLOR_EL;
        public Decimal ZNUEZ_COLOR_L;
        public Decimal ZNUEZ_COLOR_LA;
        public Decimal ZNUEZ_COLOR_A;
        public Decimal ZNUEZ_COLOR_Y;
        public Decimal ZNUEZ_COLOR_D;
    }

}