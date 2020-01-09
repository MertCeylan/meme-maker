import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  NavbarBrand
} from 'reactstrap';
import { storage, storageRef } from './Firebase/firebase';
import LazyImage from './LazyImage';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [
        { src: '/images/e.png' },
        { src: '/images/monstersInc.png' },
        { src: '/images/suicide.jpg' },
        { src: '/images/suicideIsBadass.jpg' },
        { src: '/images/stonks.png' }
      ],
      isModalOpen: false,
      imgRef: '',
      random: true,
      isLoadingDone: []
    };
    this.init();
  }

  openImage = e => {
    this.toggleModal();
    this.setState({
      imgRef: e.currentTarget.src
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image });
    }
  };

  getAllImagePaths = async () => {
    const listTask = storage.ref().child('/images');
    const images = await listTask.listAll();

    return images.items.map(meme => meme.location.path);
  };

  init = async () => {
    const pathReferences = await this.getAllImagePaths();

    for (let i = 0; i < pathReferences.length; i++) {
      await storage
        .ref()
        .child(pathReferences[i])
        .getDownloadURL()
        .then(url => {
          this.setState({
            photos: [...this.state.photos, { src: url }]
          });
        });
    }
  };

  fileUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({
              url,
              photos: [...this.state.photos, { src: url }]
            });
          });
      }
    );
  };

  renderImages = () => {
    return this.state.photos.map((image, index) => (
      <div className="image-holder" key={index}>
        <LazyImage
          style={{
            width: '100%',
            height: '100%'
          }}
          src={image.src}
          alt={'xD' + index}
          onClick={this.openImage}
        ></LazyImage>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
            <label>S T U F F </label>
            <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              provident enim nemo totam magni officiis officia consequatur,
              quaerat deleniti ipsa dolore, ipsam, accusantium labore
              perspiciatis. Libero sit eveniet dolorem maiores.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              recusandae excepturi quam veritatis ratione quae nesciunt
              assumenda minima! Temporibus autem, qui voluptas amet soluta
              nostrum porro molestias fugiat molestiae exercitationem.
            </p>
            <br />
            <p>THATS A LOT OF STUFF</p>
            <br />
            <p>EVEN MORE STUFF!!!</p>

            <input
              type="file"
              className="btn-primary"
              onChange={this.handleChange}
            ></input>
            <button className="btn-primary" onClick={this.fileUpload}>
              Upload Meme!
            </button>
          </div>
          <div className="content">{this.renderImages()}</div>
          <div>
            <Modal className="meme-gen-modal" isOpen={this.state.isModalOpen}>
              <ModalHeader toggle={this.toggleModal}>Make-a-Meme</ModalHeader>
              <ModalBody>
                <div className="main-content">
                  <img
                    style={{ width: '90%', height: '90%' }}
                    src={this.state.imgRef}
                    alt={'xD'}
                  ></img>{' '}
                  <div className="content">
                    <input type="number"></input>
                    <button className="btn-primary">Download Meme</button>E V E
                    N O R E S T U F F I N A M O D A L!
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
