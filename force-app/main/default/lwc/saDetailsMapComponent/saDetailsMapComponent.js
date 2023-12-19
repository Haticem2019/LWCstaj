import { LightningElement, wire, track } from 'lwc';
import searchSA from '@salesforce/apex/SADetailsController.searchSA';

export default class SaDetailsMapComponent extends LightningElement {
    @track mapmarkers = [];
    @track error;
    @track mapZoomLevel = 10;
    @track searchWord = '';
    @track saDetails ;
    @track listView="visible";
    // Bu işlev, arama kutusuna girilen kelimeye göre SA ayrıntılarını alır
    searchSARecords() {
        searchSA({ searchKey: this.searchWord })
            .then(result => {
                this.saDetails = result;
                this.mapmarkers = this.saDetails.map(sa => {
                    return {
                        location: {
                            Latitude: sa.Location__Latitude__s,
                            Longitude: sa.Location__Longitude__s
                        },
                        title: sa.Name
                    };
                });
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.mapmarkers = [];
            });
    }

    // Bu işlev, arama kutusundaki metni güncellediğinizde çağrılır
    seacrhHandler(event) {
        this.searchWord = event.target.value;
    }

    // Sayfa yüklendiğinde veya bileşen yenilendiğinde otomatik olarak arama yapmak için kullanabilirsiniz
    connectedCallback() {
        this.searchSARecords();
    }
}