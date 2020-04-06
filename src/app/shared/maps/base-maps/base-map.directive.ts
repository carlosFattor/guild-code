import { OnInit, ElementRef, Directive, NgZone, Input, HostListener, Output, EventEmitter } from '@angular/core';
import {
  latLng,
  Marker,
  LatLng,
  LatLngBounds,
  LeafletEvent,
  LeafletMouseEvent,
  map,
  Map,
  MapOptions,
  tileLayer,
  featureGroup
} from 'leaflet';

@Directive({
  selector: '[gcBaseMap]'
})
export class BaseMapDirective implements OnInit {
  /**
   * São Paulo position
   */
  private readonly LAT = -23.533773;
  private readonly LNG = -46.625290;
  private readonly DELAY_RESIZE = 200;
  private readonly DEFAULT_ZOOM = 1;
  private readonly DEFAULT_MAX_ZOOM = 18;
  private readonly DEFAULT_CENTER = latLng(this.LAT, this.LNG);


  map: Map | null = null;
  resizeTimer: any;

  @Input('mapOptions') mapOptions: MapOptions = {};
  @Input('zoomOptions') zoomOptions = {};
  @Input('markers') markers: Marker[] | null = null;

  @Output('mapReady') mapReady = new EventEmitter<Map>();

  constructor(
    private zone: NgZone,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.addMapLayer();
      this.map = map(this.el.nativeElement, this.mapOptions);
    });

    this.addMarkers();

    this.doResize();

    this.mapReady.emit(this.map);
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.delayResize();
  }

  addMapLayer(): void {
    if (!this.mapOptions.layers) { this.mapOptions.layers = []; }
    if (!this.mapOptions.center) { this.mapOptions.center = this.DEFAULT_CENTER; }
    if (!this.mapOptions.zoom) { this.mapOptions.zoom = this.DEFAULT_ZOOM; }

    this.mapOptions.layers.push(
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: this.DEFAULT_MAX_ZOOM,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        })
    );
  }

  addMarkers(): void {
    if (this.markers) {
      featureGroup(this.markers)
        .addTo(this.map);
    }
  }

  private delayResize(): void {
    if (this.resizeTimer !== null) {
      clearTimeout(this.resizeTimer);
    }
    this.resizeTimer = setTimeout(this.doResize.bind(this), this.DELAY_RESIZE);
  }

  private doResize(): void {

    this.zone.runOutsideAngular(() => {

      this.map.invalidateSize({});

    });
  }
}
