using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZDSB_PROCESO
    {
        public responce_ZDSB_PROCESO sapRun(request_ZDSB_PROCESO import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZDSB_PROCESO");

            rfcFunction.SetValue("CHARG", import.CHARG);
            rfcFunction.SetValue("MATNR", import.MATNR);
            rfcFunction.SetValue("MJAHR_F", import.MJAHR_F);
            rfcFunction.SetValue("MJAHR_I", import.MJAHR_I);
            if (import.INGRESO_PROCESO != null)
            {
                IRfcTable rfcTable_INGRESO_PROCESO_I = rfcFunction.GetTable("INGRESO_PROCESO");
                foreach (ZDSB_PROCESO_INGRESO_PROCESO row in import.INGRESO_PROCESO)
                {
                    rfcTable_INGRESO_PROCESO_I.Append();
                    ZDSB_PROCESO_INGRESO_PROCESO datoTabla = new ZDSB_PROCESO_INGRESO_PROCESO();
                    rfcTable_INGRESO_PROCESO_I.SetValue("MATNR", row.MATNR);
                    rfcTable_INGRESO_PROCESO_I.SetValue("CHARG", row.CHARG);
                    rfcTable_INGRESO_PROCESO_I.SetValue("MBLNR", row.MBLNR);
                    rfcTable_INGRESO_PROCESO_I.SetValue("XBLNR", row.XBLNR);
                    rfcTable_INGRESO_PROCESO_I.SetValue("BUDAT", row.BUDAT);
                    rfcTable_INGRESO_PROCESO_I.SetValue("ERFMG", row.ERFMG);
                    rfcTable_INGRESO_PROCESO_I.SetValue("MAKTX", row.MAKTX);
                    rfcTable_INGRESO_PROCESO_I.SetValue("LIFNR", row.LIFNR);
                    rfcTable_INGRESO_PROCESO_I.SetValue("NAME1", row.NAME1);
                    rfcTable_INGRESO_PROCESO_I.SetValue("VARIEDAD", row.VARIEDAD);
                    rfcTable_INGRESO_PROCESO_I.SetValue("PORCENTAJE", row.PORCENTAJE);
                    rfcTable_INGRESO_PROCESO_I.SetValue("ZMAT_TIPO", row.ZMAT_TIPO);
                    rfcTable_INGRESO_PROCESO_I.SetValue("ZNUEZ_CATEGORIA", row.ZNUEZ_CATEGORIA);
                    rfcTable_INGRESO_PROCESO_I.SetValue("ZMAT_FORMATO", row.ZMAT_FORMATO);
                }
                rfcFunction.SetValue("INGRESO_PROCESO", rfcTable_INGRESO_PROCESO_I);
            }
            if (import.RESUMEN != null)
            {
                IRfcTable rfcTable_RESUMEN_I = rfcFunction.GetTable("RESUMEN");
                foreach (ZDSB_PROCESO_RESUMEN row in import.RESUMEN)
                {
                    rfcTable_RESUMEN_I.Append();
                    ZDSB_PROCESO_RESUMEN datoTabla = new ZDSB_PROCESO_RESUMEN();
                    rfcTable_RESUMEN_I.SetValue("PROCESADORA", row.PROCESADORA);
                    rfcTable_RESUMEN_I.SetValue("TIPO_PROCESO", row.TIPO_PROCESO);
                    rfcTable_RESUMEN_I.SetValue("CHARG", row.CHARG);
                    rfcTable_RESUMEN_I.SetValue("BUDAT", row.BUDAT);
                    rfcTable_RESUMEN_I.SetValue("ESPECIE", row.ESPECIE);
                    rfcTable_RESUMEN_I.SetValue("VARIEDAD", row.VARIEDAD);
                    rfcTable_RESUMEN_I.SetValue("KILOS_PROCESO", row.KILOS_PROCESO);
                    rfcTable_RESUMEN_I.SetValue("KILOS_RESULTADO", row.KILOS_RESULTADO);
                    rfcTable_RESUMEN_I.SetValue("KILOS_DESCARTE", row.KILOS_DESCARTE);
                    rfcTable_RESUMEN_I.SetValue("KILOS_PENDIENTES", row.KILOS_PENDIENTES);
                }
                rfcFunction.SetValue("RESUMEN", rfcTable_RESUMEN_I);
            }
            if (import.SALIDA_PROCESO != null)
            {
                IRfcTable rfcTable_SALIDA_PROCESO_I = rfcFunction.GetTable("SALIDA_PROCESO");
                foreach (ZDSB_PROCESO_SALIDA_PROCESO row in import.SALIDA_PROCESO)
                {
                    rfcTable_SALIDA_PROCESO_I.Append();
                    ZDSB_PROCESO_SALIDA_PROCESO datoTabla = new ZDSB_PROCESO_SALIDA_PROCESO();
                    rfcTable_SALIDA_PROCESO_I.SetValue("MATNR", row.MATNR);
                    rfcTable_SALIDA_PROCESO_I.SetValue("CHARG", row.CHARG);
                    rfcTable_SALIDA_PROCESO_I.SetValue("MBLNR", row.MBLNR);
                    rfcTable_SALIDA_PROCESO_I.SetValue("XBLNR", row.XBLNR);
                    rfcTable_SALIDA_PROCESO_I.SetValue("BUDAT", row.BUDAT);
                    rfcTable_SALIDA_PROCESO_I.SetValue("ERFMG", row.ERFMG);
                    rfcTable_SALIDA_PROCESO_I.SetValue("MAKTX", row.MAKTX);
                    rfcTable_SALIDA_PROCESO_I.SetValue("LIFNR", row.LIFNR);
                    rfcTable_SALIDA_PROCESO_I.SetValue("VARIEDAD", row.VARIEDAD);
                    rfcTable_SALIDA_PROCESO_I.SetValue("PORCENTAJE", row.PORCENTAJE);
                    rfcTable_SALIDA_PROCESO_I.SetValue("ZMAT_TIPO", row.ZMAT_TIPO);
                    rfcTable_SALIDA_PROCESO_I.SetValue("ZNUEZ_CALIBRE", row.ZNUEZ_CALIBRE);
                    rfcTable_SALIDA_PROCESO_I.SetValue("ZNUEZ_CATEGORIA", row.ZNUEZ_CATEGORIA);
                }
                rfcFunction.SetValue("SALIDA_PROCESO", rfcTable_SALIDA_PROCESO_I);
            }
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZDSB_PROCESO res = new responce_ZDSB_PROCESO();
            IRfcTable rfcTable_INGRESO_PROCESO = rfcFunction.GetTable("INGRESO_PROCESO");
            res.INGRESO_PROCESO = new ZDSB_PROCESO_INGRESO_PROCESO[rfcTable_INGRESO_PROCESO.RowCount];
            int i_INGRESO_PROCESO = 0;
            foreach (IRfcStructure row in rfcTable_INGRESO_PROCESO)
            {
                ZDSB_PROCESO_INGRESO_PROCESO datoTabla = new ZDSB_PROCESO_INGRESO_PROCESO();
                datoTabla.MATNR = row.GetString("MATNR");
                datoTabla.CHARG = row.GetString("CHARG");
                datoTabla.MBLNR = row.GetString("MBLNR");
                datoTabla.XBLNR = row.GetString("XBLNR");
                datoTabla.BUDAT = row.GetString("BUDAT");
                datoTabla.ERFMG = row.GetDecimal("ERFMG");
                datoTabla.MAKTX = row.GetString("MAKTX");
                datoTabla.LIFNR = row.GetString("LIFNR");
                datoTabla.NAME1 = row.GetString("NAME1");
                datoTabla.VARIEDAD = row.GetString("VARIEDAD");
                datoTabla.PORCENTAJE = row.GetDecimal("PORCENTAJE");
                datoTabla.ZMAT_TIPO = row.GetString("ZMAT_TIPO");
                datoTabla.ZNUEZ_CATEGORIA = row.GetString("ZNUEZ_CATEGORIA");
                datoTabla.ZMAT_FORMATO = row.GetString("ZMAT_FORMATO");
                res.INGRESO_PROCESO[i_INGRESO_PROCESO] = datoTabla; ++i_INGRESO_PROCESO;
            }
            IRfcTable rfcTable_RESUMEN = rfcFunction.GetTable("RESUMEN");
            res.RESUMEN = new ZDSB_PROCESO_RESUMEN[rfcTable_RESUMEN.RowCount];
            int i_RESUMEN = 0;
            foreach (IRfcStructure row in rfcTable_RESUMEN)
            {
                ZDSB_PROCESO_RESUMEN datoTabla = new ZDSB_PROCESO_RESUMEN();
                datoTabla.PROCESADORA = row.GetString("PROCESADORA");
                datoTabla.TIPO_PROCESO = row.GetString("TIPO_PROCESO");
                datoTabla.CHARG = row.GetString("CHARG");
                datoTabla.BUDAT = row.GetString("BUDAT");
                datoTabla.ESPECIE = row.GetString("ESPECIE");
                datoTabla.VARIEDAD = row.GetString("VARIEDAD");
                datoTabla.KILOS_PROCESO = row.GetDecimal("KILOS_PROCESO");
                datoTabla.KILOS_RESULTADO = row.GetDecimal("KILOS_RESULTADO");
                datoTabla.KILOS_DESCARTE = row.GetDecimal("KILOS_DESCARTE");
                datoTabla.KILOS_PENDIENTES = row.GetDecimal("KILOS_PENDIENTES");
                res.RESUMEN[i_RESUMEN] = datoTabla; ++i_RESUMEN;
            }
            IRfcTable rfcTable_SALIDA_PROCESO = rfcFunction.GetTable("SALIDA_PROCESO");
            res.SALIDA_PROCESO = new ZDSB_PROCESO_SALIDA_PROCESO[rfcTable_SALIDA_PROCESO.RowCount];
            int i_SALIDA_PROCESO = 0;
            foreach (IRfcStructure row in rfcTable_SALIDA_PROCESO)
            {
                ZDSB_PROCESO_SALIDA_PROCESO datoTabla = new ZDSB_PROCESO_SALIDA_PROCESO();
                datoTabla.MATNR = row.GetString("MATNR");
                datoTabla.CHARG = row.GetString("CHARG");
                datoTabla.MBLNR = row.GetString("MBLNR");
                datoTabla.XBLNR = row.GetString("XBLNR");
                datoTabla.BUDAT = row.GetString("BUDAT");
                datoTabla.ERFMG = row.GetDecimal("ERFMG");
                datoTabla.MAKTX = row.GetString("MAKTX");
                datoTabla.LIFNR = row.GetString("LIFNR");
                datoTabla.VARIEDAD = row.GetString("VARIEDAD");
                datoTabla.PORCENTAJE = row.GetDecimal("PORCENTAJE");
                datoTabla.ZMAT_TIPO = row.GetString("ZMAT_TIPO");
                datoTabla.ZNUEZ_CALIBRE = row.GetString("ZNUEZ_CALIBRE");
                datoTabla.ZNUEZ_CATEGORIA = row.GetString("ZNUEZ_CATEGORIA");
                res.SALIDA_PROCESO[i_SALIDA_PROCESO] = datoTabla; ++i_SALIDA_PROCESO;
            }

            return res;
        }
    }
    public class request_ZDSB_PROCESO
    {
        public String CHARG;
        public String MATNR;
        public Int32 MJAHR_F;
        public Int32 MJAHR_I;
        public ZDSB_PROCESO_INGRESO_PROCESO[] INGRESO_PROCESO;
        public ZDSB_PROCESO_RESUMEN[] RESUMEN;
        public ZDSB_PROCESO_SALIDA_PROCESO[] SALIDA_PROCESO;
    }
    public class responce_ZDSB_PROCESO
    {
        public ZDSB_PROCESO_INGRESO_PROCESO[] INGRESO_PROCESO;
        public ZDSB_PROCESO_RESUMEN[] RESUMEN;
        public ZDSB_PROCESO_SALIDA_PROCESO[] SALIDA_PROCESO;
    }
    public class ZDSB_PROCESO_INGRESO_PROCESO
    {
        public String MATNR;
        public String CHARG;
        public String MBLNR;
        public String XBLNR;
        public String BUDAT;
        public Decimal ERFMG;
        public String MAKTX;
        public String LIFNR;
        public String NAME1;
        public String VARIEDAD;
        public Decimal PORCENTAJE;
        public String ZMAT_TIPO;
        public String ZNUEZ_CATEGORIA;
        public String ZMAT_FORMATO;
    }
    public class ZDSB_PROCESO_RESUMEN
    {
        public String PROCESADORA;
        public String TIPO_PROCESO;
        public String CHARG;
        public String BUDAT;
        public String ESPECIE;
        public String VARIEDAD;
        public Decimal KILOS_PROCESO;
        public Decimal KILOS_RESULTADO;
        public Decimal KILOS_DESCARTE;
        public Decimal KILOS_PENDIENTES;
    }
    public class ZDSB_PROCESO_SALIDA_PROCESO
    {
        public String MATNR;
        public String CHARG;
        public String MBLNR;
        public String XBLNR;
        public String BUDAT;
        public Decimal ERFMG;
        public String MAKTX;
        public String LIFNR;
        public String VARIEDAD;
        public Decimal PORCENTAJE;
        public String ZMAT_TIPO;
        public String ZNUEZ_CALIBRE;
        public String ZNUEZ_CATEGORIA;
    }

}