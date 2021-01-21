import React from "react";
import { Card } from "react-bootstrap";
import Iframe from 'react-iframe';

// This is a card component that is from bootstrap used to display the patent via an IFrame

const PatentCard = (props) => {

  return (
    <Card style={{ width: "100%" }}>

      <Card.Body>
        <Iframe
            url={checkID(props.patents)}
            width="100%"
            height="1000px"
            className="size"
            display="initial"
            postion="relative"
        />
      </Card.Body>
    </Card>
  );
}

// This function is used to check the patent documentID and append it to the correct url needed to dispaly.
// The if statement was created to avoid a sync issue with the state from the parent component

function checkID(patents){

  if(patents !== undefined)
  {
    console.log(patents)
    
      const id = patents[0].documentId
    
          if(patents[0].patentCorpus === "USPAT")
          {
            return  ("https://pdfpiw.uspto.gov/"+id.substring(6, 8)+"/"+id.substring(3, 6)+"/"+id.substring(0, 3)+"/1.pdf")
    
          }else if (patents[0].patentCorpus === "PGPUB")
          
          {
            return ("http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.html&r=1&f=G&l=50&d=PG01&p=1&S1="+id+".PGNR.&OS=DN/"+id+"&RS=DN/"+id);
          }
        }
    
  }




export default PatentCard;
