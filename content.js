var arrayBuffer;
var oReq = new XMLHttpRequest();
// oReq.open("GET", "https://github.com/google/fonts/blob/master/ofl/copse/Copse-Regular.ttf?raw=true", true);
oReq.open("GET", "https://github.com/bryce27/etsyPDFMaker/blob/master/Archer-Book-Pro.ttf?raw=true", true);
oReq.responseType = "arraybuffer";

oReq.onload = function(oEvent) {
	arrayBuffer = oReq.response;
    start() // Note: not oReq.responseText
};

oReq.send(null);


var pickedDate;

function start(){

	console.log('start')

	var pdfsMade = 0;

	chrome.extension.onRequest.addListener( 
		function(request, sender, sendResponse) { 
			var values = request.date;
			console.log(request);
			pickedDate = new Date(values[0], parseInt(values[1])-1, values[2]);

			if (pdfsMade == 0){
				makePDF()
				pdfsMade++;
			}

		}); 
}

function makePDF(){
	console.log('makePDF...')

	var ordersInRange = []

	var allOrderElements = $('.order-summary .order-shipping').toArray()

	allOrderElements.forEach( function( order ){
		var dateSentence = $(order).find('.ship-by-time').html()
		var customerName = $(order).find('.address .name').text()
		var str = dateSentence.split("by")
		var newDate = new Date($(str[1]).text());

		if (newDate >= pickedDate){
			var firstName = customerName.split(' ')[0];
			var order = {
				shipBy: new Date($(str[1]).text()),
				customerFullName: customerName,
				customerFirstName: firstName
			}
			ordersInRange.push(order)
		}

	});

	var y = 60;
	var x = 120;
	var count = 0;

	var doc = new PDFDocument({ layout: 'landscape'});

	if (arrayBuffer) {
		doc.registerFont('ArcherBook', arrayBuffer)
	}
	var stream = doc.pipe(blobStream());

	doc.font('ArcherBook')

	doc = drawLines(doc)

	function drawLines(doc){

		doc.lineWidth(.3)
		doc.strokeColor('gray')

		var xRightBound = 715;
		var xLeftBound = 80;

		var yUpperBound = 35;
		var yLowerBound = 550;

		var yCenter = 290;
		var xCenter = 395;

		doc.moveTo(xLeftBound, yUpperBound).lineTo(xRightBound, yUpperBound).stroke()

		doc.moveTo(xLeftBound, yUpperBound).lineTo(xLeftBound, yLowerBound).stroke()

		doc.moveTo(xLeftBound, yLowerBound).lineTo(xRightBound, yLowerBound).stroke()

		doc.moveTo(xRightBound, yLowerBound).lineTo(xRightBound, yUpperBound).stroke()

		doc.moveTo(xLeftBound, yCenter).lineTo(xRightBound, yCenter).stroke() // center line 

		doc.moveTo(xCenter, yUpperBound).lineTo(xCenter, yLowerBound).stroke() // center vertical line

		return doc
	}

	var heart ='data:image/png;base64,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';
	var terra = 'data:image/png;base64,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';

	ordersInRange.forEach( function ( order ){

		if (count == 4){
			count = 0;
			doc.addPage();
			doc = drawLines(doc)
			x = 120;
			y = 60;
		}

		if (count == 2){
			x += 320;
			y = 60;
		}

		doc.fontSize(18)
		.text('Hi '+order.customerFirstName+'!', x, y);

		doc.fontSize(18)
		.text('Thank you for choosing to', x, y+40);

		doc.fontSize(18)
		.text('shop with us! We hope you', x, y+65);

		doc.fontSize(18)
		.text('enjoy your stickers!', x, y+90);

		doc.fontSize(18)
		.text('Pumpkin Paper Co.', x, y+190);

		doc.image(heart, x, y+155, {width: 30}); 

		doc.image(terra, x+160, y+107, {width: 70});   

		y += 260;
		count++
	})

	doc.end();

	stream.on('finish', function() {
		var blob = stream.toBlob('application/pdf');
		saveData(blob, 'test.pdf');
	});

}

var saveData = (function () {
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	return function (blob, fileName) {
		var url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
}());


