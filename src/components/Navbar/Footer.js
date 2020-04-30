import React from 'react'
import { MDBContainer, MDBFooter } from 'mdbreact'


const Footer = () => {
    return(
        <MDBFooter color="stylish-color-dark" className="page-footer font-small pt-4 mt-4">
            <div className="text-center py-3">
            <a>Contact:</a>
                
            </div>
            
            <div className="text-center">
                <a class="btn btn-social-icon btn-facebook" href="https://www.facebook.com/be.bumrungthin">
                    <span class="fa fa-facebook"></span>
                </a>

                <a class="btn btn-social-icon btn-git" href="https://github.com/cdnbrt22/DCWminipj-blog">
                    <span class="fa fa-github"></span>
                </a>

                <a class="btn btn-social-icon btn-pinterest" href="https://www.youtube.com/watch?v=nGkWCHccKAY">
                    <span class="fa fa-youtube"></span>
                </a>
                <br/><br/>
                <ul>
                    <li><a href="https://medium.com/@bebumrungthin/dcw-mini-project-blog-travel-95ef6cb71b25" className="btm">Go to Medium</a></li>
                </ul>
                    
                
            </div>
       
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                  &copy; {new Date().getFullYear()} Copyright:<a>CDNBRT.</a>
                </MDBContainer>
              </div>
            </MDBFooter>
          );
        }

export default Footer;