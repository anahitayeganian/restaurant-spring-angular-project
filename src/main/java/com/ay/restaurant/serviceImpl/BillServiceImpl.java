package com.ay.restaurant.serviceImpl;

import com.ay.restaurant.constants.RestaurantConstants;
import com.ay.restaurant.dao.BillDao;
import com.ay.restaurant.jwt.JwtFilter;
import com.ay.restaurant.pojo.Bill;
import com.ay.restaurant.service.BillService;
import com.ay.restaurant.utils.RestaurantUtils;
import com.google.common.base.Strings;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.util.Map;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillDao billDao;
    private final JwtFilter jwtFilter;

    /* Generates a PDF report based on the provided request map containing bill details.
     * This method validates the request map, generates a file name, creates a PDF document, adds content to the document and saves the document to the file system */
    @Override
    public ResponseEntity<String> generateReport(Map<String,Object> requestMap) {
        log.info("Inside generateReport");
        try {
            if(validateRequestMap(requestMap)) {
                String fileName = generateFileName(requestMap);
                if(!Strings.isNullOrEmpty(fileName)) {
                    Document document = new Document();
                    /* An instance of PdfWriter is associated with a PDF document. It specifies the output stream where the PDF content will be written (it initializes the PDF writing process to the specified file location) */
                    PdfWriter.getInstance(document, new FileOutputStream(RestaurantConstants.STORE_LOCATION + fileName + ".pdf"));
                    document.open();
                    addContentToDocument(document, requestMap);
                    document.close();
                    return new ResponseEntity<>("{\"uuid\":\"" + fileName + "\"}", HttpStatus.OK);
                }
            }
            else
                return RestaurantUtils.getResponseEntity("Required data not found", HttpStatus.BAD_REQUEST);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return RestaurantUtils.getResponseEntity(RestaurantConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateRequestMap(Map<String,Object> requestMap) {
        return requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
                && requestMap.containsKey("email") && requestMap.containsKey("paymentMethod")
                && requestMap.containsKey("itemDetails") && requestMap.containsKey("totalAmount");
    }

    private String generateFileName(Map<String,Object> requestMap) {
        if (requestMap.containsKey("isGenerated") && !(Boolean) requestMap.get("isGenerated")) {
            return (String) requestMap.get("uuid");
        }
        else {
            String fileName = RestaurantUtils.getUUID();
            requestMap.put("uuid", fileName);
            saveBill(requestMap);
            return fileName;
        }
    }

    private void addContentToDocument(Document document, Map<String, Object> requestMap) throws Exception {
        String data = prepareData(requestMap);
        Paragraph header = new Paragraph("Restaurant Management System", getFont("Header"));
        header.setAlignment(Element.ALIGN_CENTER);
        document.add(header);
        Paragraph paragraph = new Paragraph("\n" + data + "\n \n", getFont("Data"));
        document.add(paragraph);
        PdfPTable table = createTable();
        addTableHeader(table);
        JSONArray jsonArray = RestaurantUtils.getJsonArrayFromString((String) requestMap.get("itemDetails"));
        for(int i=0; i<jsonArray.length(); i++) {
            addRows(table, RestaurantUtils.getMapFromJson(jsonArray.getString(i)));
        }
        document.add(table);
        Paragraph footer = new Paragraph("\nTotal: " + requestMap.get("totalAmount") + "\nThank you for visiting!");
        document.add(footer);
    }

    private String prepareData(Map<String, Object> requestMap) {
        return "Name: " + requestMap.get("name") + "\n" +
                "Contact number: " + requestMap.get("contactNumber") + "\n" +
                "Email: " + requestMap.get("email") + "\n" +
                "Payment method: " + requestMap.get("paymentMethod");
    }

    /* Retrieves the appropriate font based on the specified type */
    private Font getFont(String type) {
        log.info("Inside getFont");
        switch(type) {
            case "Header":
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 16, BaseColor.BLACK);
                headerFont.setStyle(Font.BOLD);
                return headerFont;
            case "Data":
                return FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, BaseColor.BLACK);
            default:
                return new Font();
        }
    }

    /* Creates a PDF table for displaying item details */
    private PdfPTable createTable() {
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        return table;
    }

    private void addTableHeader(PdfPTable table) {
        log.info("Inside addTableHeader");
        Stream.of("Name", "Category", "Quantity", "Price", "Sub Total")
                .forEach(columnTitle -> {
                    PdfPCell tableHeader = new PdfPCell();
                    tableHeader.setPhrase(new Phrase(columnTitle));
                    tableHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
                    tableHeader.setVerticalAlignment(Element.ALIGN_CENTER);
                    tableHeader.setBorderWidth(1f); // Adjust the width as needed
                    table.addCell(tableHeader);
                });
    }

    /* Saves the bill details to the database */
    private void saveBill(Map<String,Object> requestMap) {
        try {
            Bill bill = new Bill();
            bill.setUuid((String) requestMap.get("uuid"));
            bill.setName((String) requestMap.get("name"));
            bill.setEmail((String) requestMap.get("email"));
            bill.setContactNumber((String) requestMap.get("contactNumber"));
            bill.setPaymentMethod((String) requestMap.get("paymentMethod"));
            bill.setTotal(Integer.parseInt((String) requestMap.get("totalAmount")));
            bill.setItemDetails((String) requestMap.get("itemDetails"));
            bill.setCreatedBy(jwtFilter.getCurrentUser());
            billDao.save(bill);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }

    /* Adds rows to the PDF table based on the provided data */
    private void addRows(PdfPTable table, Map<String,Object> data) {
        log.info("Inside addRows");
        table.addCell((String) data.get("name"));
        table.addCell((String) data.get("category"));
        table.addCell((String) data.get("quantity"));
        table.addCell(Double.toString((Double) data.get("price")));
        table.addCell(Double.toString((Double) data.get("total")));
    }

}
