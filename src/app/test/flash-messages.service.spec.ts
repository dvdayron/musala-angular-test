import { FlashMessageService } from '../services/flash-messages.service';

describe('FlashMessageService', () => {

    let service: FlashMessageService;
    beforeEach(() => { service = new FlashMessageService(); });

    it('test add message function', () => {
        let message = {
            text: 'New message',
            className: 'danger'
        };
        service.addMessage(message);
        expect(service.message.value.text).toEqual(message.text);
        expect(service.message.value.className).toEqual(message.className);
    });

});