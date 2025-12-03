import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { Project } from 'src/app/models/project';
import { Education } from 'src/app/models/education';
import { Exp } from 'src/app/models/exp';
import { Skill } from 'src/app/models/skill';

import { ImportallService } from '../../services/importall.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-topdf',
  templateUrl: './topdf.component.html',
  styleUrls: ['./topdf.component.scss'],
  providers: [DatePipe]
})
export class TopdfComponent implements OnInit {

  arrHead: Profile[] = [];
  arrProyectos: Project[];
  arrEducacion: Education[] = [];
  arrExperiencias: Exp[] = [];
  arrSkills: Skill[] = [];
  allDataLoaded = false;
  
  constructor(
    private services: ImportallService,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe
  ) { }
  
  ngOnInit(): void {
    this.loadAllData();
  }
  
  loadAllData() {
    let loadedCount = 0;
    const totalRequests = 5;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalRequests) {
        this.allDataLoaded = true;
      }
    };
    
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data['response'] || data;
        checkAllLoaded();
      },
      err => {
        console.error('Error retrieving profile:', err);
        this.arrHead = [];
        checkAllLoaded();
      }
    );
    
    this.services.getAll('proyecto').subscribe(
      data => {
        this.arrProyectos = data['response'] || data;
        checkAllLoaded();
      },
      err => {
        console.error('Error retrieving proyecto:', err);
        this.arrProyectos = [];
        checkAllLoaded();
      }
    );
    
    this.services.getAll('educacion').subscribe(
      data => {
        this.arrEducacion = data['response'] || data;
        checkAllLoaded();
      },
      err => {
        console.error('Error retrieving educacion:', err);
        this.arrEducacion = [];
        checkAllLoaded();
      }
    );
    
    this.services.getAll('experiencia').subscribe(
      data => {
        this.arrExperiencias = data['response'] || data;
        checkAllLoaded();
      },
      err => {
        console.error('Error retrieving experiencia:', err);
        this.arrExperiencias = [];
        checkAllLoaded();
      }
    );
    
    this.services.getAll('skill').subscribe(
      data => {
        this.arrSkills = data['response'] || data;
        checkAllLoaded();
      },
      err => {
        console.error('Error retrieving skill:', err);
        this.arrSkills = [];
        checkAllLoaded();
      }
    );
  }
  
  async getProject() {
    this.services.getAll('proyecto').subscribe(
      data => {
        this.arrProyectos = data['response'] || data;
      },
      err => {
        const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
        console.error('Error retrieving proyecto:', errorMessage);
        this.arrProyectos = [];
      }
    );
  }
  get() {
    this.services.getAll('profile').subscribe(
      data => {
        this.arrHead = data['response'] || data;
      },
      err => {
        const errorMessage = err.error?.message || (typeof err.error === 'string' ? JSON.parse(err.error).message : 'Error retrieving data');
        console.error('Error retrieving profile:', errorMessage);
        this.arrHead = [];
      }
    );
  }

  public exportHtmlToPDF(){
    // Scroll to top
    window.scrollTo(0, 0);
    
    const element = document.getElementById('topdf');
    
    if (!element) {
      alert('Error: No se pudo encontrar el contenido para generar el PDF');
      return;
    }

    // Hide elements that shouldn't appear in PDF
    const elementsToHide: HTMLElement[] = [];
    
    // Hide edit buttons inside the element
    const editButtons = element.querySelectorAll('.edicion, mat-card-actions');
    editButtons.forEach((el: HTMLElement) => {
      el.style.display = 'none';
      elementsToHide.push(el);
    });

    // Hide action buttons and spinner outside the element
    const actionButtons = document.querySelectorAll('mat-card-actions button[mat-raised-button]');
    actionButtons.forEach((el: HTMLElement) => {
      el.style.display = 'none';
      elementsToHide.push(el);
    });

    const spinner = document.querySelector('app-spinner');
    if (spinner) {
      (spinner as HTMLElement).style.display = 'none';
      elementsToHide.push(spinner as HTMLElement);
    }

    // Wait for all images to load
    const images = element.getElementsByTagName('img');
    const imagePromises: Promise<void>[] = [];
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img.complete) {
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if image fails
            setTimeout(() => resolve(), 5000);
          })
        );
      }
    }

    Promise.all(imagePromises).then(() => {
      // Additional wait for async components to render
      setTimeout(() => {
        // Force a reflow to ensure everything is rendered
        element.offsetHeight;

        // Ensure drawer is fully visible
        const drawer = element.querySelector('mat-drawer');
        if (drawer) {
          (drawer as HTMLElement).style.visibility = 'visible';
          (drawer as HTMLElement).style.display = 'block';
        }

        // Get the actual dimensions - use scroll dimensions to capture everything
        const scrollWidth = Math.max(element.scrollWidth, element.clientWidth);
        const scrollHeight = Math.max(element.scrollHeight, element.clientHeight);

        html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true, // Allow tainted canvas for external images
          width: scrollWidth,
          height: scrollHeight,
          windowWidth: scrollWidth,
          windowHeight: scrollHeight,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          removeContainer: false,
          foreignObjectRendering: false // Disable to avoid rendering issues
        }).then((canvas) => {
          // Restore hidden elements
          elementsToHide.forEach((el) => {
            el.style.display = '';
          });
          
          if (canvas.width === 0 || canvas.height === 0) {
            alert('Error: El contenido está vacío.');
            return;
          }
          
          const imgData = canvas.toDataURL('image/png', 1.0);
          
          // A4 dimensions in mm
          const pdfWidth = 210;
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          
          const pdf = new jsPDF('p', 'mm', 'a4');
          
          // Calculate how many pages we need
          const pageHeight = 297; // A4 height in mm
          const totalPages = Math.ceil(pdfHeight / pageHeight);
          
          if (totalPages === 1) {
            // Single page
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          } else {
            // Multiple pages - split the image across pages
            let heightLeft = pdfHeight;
            let position = 0;
            
            // First page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
            
            // Additional pages
            while (heightLeft > 0) {
              position = heightLeft - pdfHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
              heightLeft -= pageHeight;
            }
          }
          
          pdf.save('curriculum.pdf');
          this.close();
        }).catch((error) => {
          // Restore hidden elements on error
          elementsToHide.forEach((el) => {
            el.style.display = '';
          });
          console.error('Error generating PDF:', error);
          alert('Error al generar el PDF: ' + error.message);
        });
      }, 2000); // Wait for rendering
    });
  }
  
  close(){
    this.router.navigate(['/']);
  }
}
