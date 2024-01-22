import React, { useContext } from 'react';
import { Session } from '../Session/session';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Crea tus estilos
const styles = StyleSheet.create({
   page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
   },
   section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
   },
   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100vw',
   },
   item: {
      flex: 1,
      flexDirection: 'row',
   }
});

// Crea tu documento
const PDFDocument = ({saleData, productData, renderTime, user}) => {
   const renderProducts = function(products, quantity) {
      let productsList = [];
      for(let doc of products) {
         for(let id in quantity) {
            if(doc._id === id) {
               productsList.push({name: doc.name, quantity: quantity[id], price: doc.price});
            }
         }
      }
      return productsList.map(({name, quantity, price}, index) => (
         <View key={index} style={styles.row}>
            <Text style={styles.item}>{name}</Text>
            <Text style={styles.item}>x{quantity}</Text>
            <Text style={styles.item}>${price.toFixed(2)}</Text>
         </View>
      ));
   }
   return (
      <Document>
         <Page size="A4" style={styles.page}>
            <View style={styles.section}>
               <Text>Referencia: {saleData && saleData._id}</Text>
            </View>
            <View style={styles.section}>
               <Text>Fecha: {renderTime(saleData && saleData.createdAt)}</Text>
            </View>
            <View style={styles.section}>
               <Text>Cliente: {user && user.name + " " + user.lastName}</Text>
            </View>
            <View style={styles.section}>
               <Text>Productos:</Text>
               <Text>{productData && renderProducts(productData, saleData.quantity)}</Text>
            </View>
            <View style={styles.section}>
               <Text>Subtotal: ${saleData && saleData.subtotal && saleData.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.section}>
               <Text>IVA 16%: ${saleData && saleData.tax && saleData.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.section}>
               <Text>Total: ${saleData && saleData.total && saleData.total.toFixed(2)}</Text>
            </View>
         </Page>
      </Document>
   )
};

export default PDFDocument;
