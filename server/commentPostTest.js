import chai from 'chai';
import supertest from 'supertest';
import io from 'socket.io-client';
import { app } from './index.js'; 

const { expect } = chai;
const api = supertest(app);

const SERVER_URL = process.env.APP_URL; 

describe('Comment Post API', () => {
  let userSocket;
  let postUserSocket;
  before(async () => {
    userSocket = io(SERVER_URL);
    postUserSocket = io(SERVER_URL);
  });
  after((done) => {
    userSocket.disconnect();
    postUserSocket.disconnect();
    done();
  });

  it('should comment a post and notify the post owner via WebSocket', async function () {
    this.timeout(15000);

    userSocket.emit('setUserId','655fc182a1b7f0f9296c2945'); // Replace with a valid user ID
    postUserSocket.emit('setUserId',  '6543990111a0c7dae38d06fa'); // Replace with a valid post owner ID
    const requestPayload = {
        content:"Viva Algeria"
    }

    // Simulate liking a post
    const res = await api.post('/post/comment/656ba6a7c17e575d07dd6757') // Replace with a valid post ID
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVmYzE4MmExYjdmMGY5Mjk2YzI5NDUiLCJpYXQiOjE3MDI2MzY3MDcsImV4cCI6MTcwMjcyMzEwN30.ByEGHisCcB2auoorDGna2lg9pgMHZ23jDStJaNz3DFw') // Replace with a valid access token
      .send(requestPayload);

    expect(res.status).to.equal(201);

    // Listen for 'likepost' event on the post owner's socket
    const likePostPromise = new Promise((resolve) => {
      postUserSocket.on('commentpost', (data) => {
        expect(data.user.id).to.equal('655fc182a1b7f0f9296c2945'); // Replace with the user ID who liked the post
        expect(data.notification.content).to.equal(`${user.userName} a commenté votre post.`);
        resolve();
      });
    });
  });
});
