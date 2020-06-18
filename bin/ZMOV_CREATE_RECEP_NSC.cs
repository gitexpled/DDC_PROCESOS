using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SAP.Middleware.Connector;

namespace rfcBaika
{
    public class ZMOV_CREATE_RECEP_NSC
    {
        public responce_ZMOV_CREATE_RECEP_NSC sapRun(request_ZMOV_CREATE_RECEP_NSC import)
        {
            RfcDestination configSap = RfcDestinationManager.GetDestination("PRO_router");
            RfcRepository SapRfcRepository = configSap.Repository;
            IRfcFunction rfcFunction = SapRfcRepository.CreateFunction("ZMOV_CREATE_RECEP_NSC");

            RfcStructureMetadata obj_ZMOV_ST_HEADER_NSC = SapRfcRepository.GetStructureMetadata("ZMOV_ST_HEADER_NSC");
            IRfcStructure datos_ZMOV_ST_HEADER_NSC = obj_ZMOV_ST_HEADER_NSC.CreateStructure();
            datos_ZMOV_ST_HEADER_NSC.SetValue("BUKRS", import.HEADER.BUKRS);
            datos_ZMOV_ST_HEADER_NSC.SetValue("EKORG", import.HEADER.EKORG);
            datos_ZMOV_ST_HEADER_NSC.SetValue("EKGRP", import.HEADER.EKGRP);
            datos_ZMOV_ST_HEADER_NSC.SetValue("BSART", import.HEADER.BSART);
            datos_ZMOV_ST_HEADER_NSC.SetValue("BUDAT", import.HEADER.BUDAT);
            datos_ZMOV_ST_HEADER_NSC.SetValue("LIFNR", import.HEADER.LIFNR);
            datos_ZMOV_ST_HEADER_NSC.SetValue("XBLNR", import.HEADER.XBLNR);
            datos_ZMOV_ST_HEADER_NSC.SetValue("BKTXT", import.HEADER.BKTXT);
            datos_ZMOV_ST_HEADER_NSC.SetValue("ZNUEZ_VARIEDAD", import.HEADER.ZNUEZ_VARIEDAD);
            datos_ZMOV_ST_HEADER_NSC.SetValue("ZNUEZ_CUARTEL", import.HEADER.ZNUEZ_CUARTEL);
            rfcFunction.SetValue("HEADER", datos_ZMOV_ST_HEADER_NSC);
            IRfcTable rfcTable_ITEM_DEST_I = rfcFunction.GetTable("ITEM_DEST");
            foreach (ZMOV_CREATE_RECEP_NSC_ITEM_DEST row in import.ITEM_DEST)
            {
                rfcTable_ITEM_DEST_I.Append();
                ZMOV_CREATE_RECEP_NSC_ITEM_DEST datoTabla = new ZMOV_CREATE_RECEP_NSC_ITEM_DEST();
                rfcTable_ITEM_DEST_I.SetValue("LFPOS", row.LFPOS);
                rfcTable_ITEM_DEST_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEM_DEST_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEM_DEST_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEM_DEST_I.SetValue("WERKS", row.WERKS);
                rfcTable_ITEM_DEST_I.SetValue("LGORT", row.LGORT);
            }
            rfcFunction.SetValue("ITEM_DEST", rfcTable_ITEM_DEST_I);
            IRfcTable rfcTable_ITEM_NSC_I = rfcFunction.GetTable("ITEM_NSC");
            foreach (ZMOV_CREATE_RECEP_NSC_ITEM_NSC row in import.ITEM_NSC)
            {
                rfcTable_ITEM_NSC_I.Append();
                ZMOV_CREATE_RECEP_NSC_ITEM_NSC datoTabla = new ZMOV_CREATE_RECEP_NSC_ITEM_NSC();
                rfcTable_ITEM_NSC_I.SetValue("STCK_TYPE", row.STCK_TYPE);
                rfcTable_ITEM_NSC_I.SetValue("MATERIAL", row.MATERIAL);
                rfcTable_ITEM_NSC_I.SetValue("BATCH", row.BATCH);
                rfcTable_ITEM_NSC_I.SetValue("QUANTITY", row.QUANTITY);
                rfcTable_ITEM_NSC_I.SetValue("PO_UNIT", row.PO_UNIT);
                rfcTable_ITEM_NSC_I.SetValue("HSDAT", row.HSDAT);
                rfcTable_ITEM_NSC_I.SetValue("PLANT", row.PLANT);
                rfcTable_ITEM_NSC_I.SetValue("STGE_LOC", row.STGE_LOC);
                rfcTable_ITEM_NSC_I.SetValue("ZNUEZ_VARIEDAD", row.ZNUEZ_VARIEDAD);
                rfcTable_ITEM_NSC_I.SetValue("CLASIF_BDJA", row.CLASIF_BDJA);
                rfcTable_ITEM_NSC_I.SetValue("FREE_ITEM", row.FREE_ITEM);
            }
            rfcFunction.SetValue("ITEM_NSC", rfcTable_ITEM_NSC_I);
            rfcFunction.Invoke(configSap);
            string aa = rfcFunction.ToString();
            responce_ZMOV_CREATE_RECEP_NSC res = new responce_ZMOV_CREATE_RECEP_NSC();
            res.MATERIALDOCUMENT = rfcFunction.GetString("MATERIALDOCUMENT");
            res.MATERIALDOCUMENT_BD = rfcFunction.GetString("MATERIALDOCUMENT_BD");
            res.PEDIDO = rfcFunction.GetString("PEDIDO");
            IRfcTable rfcTable_ITEM_DEST = rfcFunction.GetTable("ITEM_DEST");
            res.ITEM_DEST = new ZMOV_CREATE_RECEP_NSC_ITEM_DEST[rfcTable_ITEM_DEST.RowCount];
            int i_ITEM_DEST = 0;
            foreach (IRfcStructure row in rfcTable_ITEM_DEST)
            {
                ZMOV_CREATE_RECEP_NSC_ITEM_DEST datoTabla = new ZMOV_CREATE_RECEP_NSC_ITEM_DEST();
                datoTabla.LFPOS = row.GetInt("LFPOS");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.WERKS = row.GetString("WERKS");
                datoTabla.LGORT = row.GetString("LGORT");
                res.ITEM_DEST[i_ITEM_DEST] = datoTabla; ++i_ITEM_DEST;
            }
            IRfcTable rfcTable_ITEM_NSC = rfcFunction.GetTable("ITEM_NSC");
            res.ITEM_NSC = new ZMOV_CREATE_RECEP_NSC_ITEM_NSC[rfcTable_ITEM_NSC.RowCount];
            int i_ITEM_NSC = 0;
            foreach (IRfcStructure row in rfcTable_ITEM_NSC)
            {
                ZMOV_CREATE_RECEP_NSC_ITEM_NSC datoTabla = new ZMOV_CREATE_RECEP_NSC_ITEM_NSC();
                datoTabla.STCK_TYPE = row.GetString("STCK_TYPE");
                datoTabla.MATERIAL = row.GetString("MATERIAL");
                datoTabla.BATCH = row.GetString("BATCH");
                datoTabla.QUANTITY = row.GetDecimal("QUANTITY");
                datoTabla.PO_UNIT = row.GetString("PO_UNIT");
                datoTabla.HSDAT = row.GetString("HSDAT");
                datoTabla.PLANT = row.GetString("PLANT");
                datoTabla.STGE_LOC = row.GetString("STGE_LOC");
                datoTabla.ZNUEZ_VARIEDAD = row.GetString("ZNUEZ_VARIEDAD");
                datoTabla.CLASIF_BDJA = row.GetString("CLASIF_BDJA");
                datoTabla.FREE_ITEM = row.GetString("FREE_ITEM");
                res.ITEM_NSC[i_ITEM_NSC] = datoTabla; ++i_ITEM_NSC;
            }
            IRfcTable rfcTable_RETURN_DEST = rfcFunction.GetTable("RETURN_DEST");
            res.RETURN_DEST = new ZMOV_CREATE_RECEP_NSC_RETURN_DEST[rfcTable_RETURN_DEST.RowCount];
            int i_RETURN_DEST = 0;
            foreach (IRfcStructure row in rfcTable_RETURN_DEST)
            {
                ZMOV_CREATE_RECEP_NSC_RETURN_DEST datoTabla = new ZMOV_CREATE_RECEP_NSC_RETURN_DEST();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETURN_DEST[i_RETURN_DEST] = datoTabla; ++i_RETURN_DEST;
            }
            IRfcTable rfcTable_RETURN_NSC = rfcFunction.GetTable("RETURN_NSC");
            res.RETURN_NSC = new ZMOV_CREATE_RECEP_NSC_RETURN_NSC[rfcTable_RETURN_NSC.RowCount];
            int i_RETURN_NSC = 0;
            foreach (IRfcStructure row in rfcTable_RETURN_NSC)
            {
                ZMOV_CREATE_RECEP_NSC_RETURN_NSC datoTabla = new ZMOV_CREATE_RECEP_NSC_RETURN_NSC();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETURN_NSC[i_RETURN_NSC] = datoTabla; ++i_RETURN_NSC;
            }
            IRfcTable rfcTable_RETURN_PO = rfcFunction.GetTable("RETURN_PO");
            res.RETURN_PO = new ZMOV_CREATE_RECEP_NSC_RETURN_PO[rfcTable_RETURN_PO.RowCount];
            int i_RETURN_PO = 0;
            foreach (IRfcStructure row in rfcTable_RETURN_PO)
            {
                ZMOV_CREATE_RECEP_NSC_RETURN_PO datoTabla = new ZMOV_CREATE_RECEP_NSC_RETURN_PO();
                datoTabla.TYPE = row.GetString("TYPE");
                datoTabla.ID = row.GetString("ID");
                datoTabla.NUMBER = row.GetInt("NUMBER");
                datoTabla.MESSAGE = row.GetString("MESSAGE");
                datoTabla.LOG_NO = row.GetString("LOG_NO");
                datoTabla.LOG_MSG_NO = row.GetInt("LOG_MSG_NO");
                datoTabla.MESSAGE_V1 = row.GetString("MESSAGE_V1");
                datoTabla.MESSAGE_V2 = row.GetString("MESSAGE_V2");
                datoTabla.MESSAGE_V3 = row.GetString("MESSAGE_V3");
                datoTabla.MESSAGE_V4 = row.GetString("MESSAGE_V4");
                datoTabla.PARAMETER = row.GetString("PARAMETER");
                datoTabla.ROW = row.GetInt("ROW");
                datoTabla.FIELD = row.GetString("FIELD");
                datoTabla.SYSTEM = row.GetString("SYSTEM");
                res.RETURN_PO[i_RETURN_PO] = datoTabla; ++i_RETURN_PO;
            }

            return res;
        }
    }
    public class request_ZMOV_CREATE_RECEP_NSC
    {
        public ZMOV_CREATE_RECEP_NSC_HEADER HEADER;
        public ZMOV_CREATE_RECEP_NSC_ITEM_DEST[] ITEM_DEST;
        public ZMOV_CREATE_RECEP_NSC_ITEM_NSC[] ITEM_NSC;
    }
    public class responce_ZMOV_CREATE_RECEP_NSC
    {
        public String MATERIALDOCUMENT;
        public String MATERIALDOCUMENT_BD;
        public String PEDIDO;
        public ZMOV_CREATE_RECEP_NSC_ITEM_DEST[] ITEM_DEST;
        public ZMOV_CREATE_RECEP_NSC_ITEM_NSC[] ITEM_NSC;
        public ZMOV_CREATE_RECEP_NSC_RETURN_DEST[] RETURN_DEST;
        public ZMOV_CREATE_RECEP_NSC_RETURN_NSC[] RETURN_NSC;
        public ZMOV_CREATE_RECEP_NSC_RETURN_PO[] RETURN_PO;
    }
    public class ZMOV_CREATE_RECEP_NSC_HEADER
    {
        public String BUKRS;
        public String EKORG;
        public String EKGRP;
        public String BSART;
        public String BUDAT;
        public String LIFNR;
        public String XBLNR;
        public String BKTXT;
        public String ZNUEZ_VARIEDAD;
        public String ZNUEZ_CUARTEL;
    }
    public class ZMOV_CREATE_RECEP_NSC_ITEM_DEST
    {
        public Int32 LFPOS;
        public String MATERIAL;
        public Decimal QUANTITY;
        public String PO_UNIT;
        public String WERKS;
        public String LGORT;
    }
    public class ZMOV_CREATE_RECEP_NSC_ITEM_NSC
    {
        public String STCK_TYPE;
        public String MATERIAL;
        public String BATCH;
        public Decimal QUANTITY;
        public String PO_UNIT;
        public String HSDAT;
        public String PLANT;
        public String STGE_LOC;
        public String ZNUEZ_VARIEDAD;
        public String CLASIF_BDJA;
        public String FREE_ITEM;
    }
    public class ZMOV_CREATE_RECEP_NSC_RETURN_DEST
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }
    public class ZMOV_CREATE_RECEP_NSC_RETURN_NSC
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }
    public class ZMOV_CREATE_RECEP_NSC_RETURN_PO
    {
        public String TYPE;
        public String ID;
        public Int32 NUMBER;
        public String MESSAGE;
        public String LOG_NO;
        public Int32 LOG_MSG_NO;
        public String MESSAGE_V1;
        public String MESSAGE_V2;
        public String MESSAGE_V3;
        public String MESSAGE_V4;
        public String PARAMETER;
        public Int32 ROW;
        public String FIELD;
        public String SYSTEM;
    }

}